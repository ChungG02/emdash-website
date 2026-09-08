# Kế hoạch i18n UI tối giản

## Phạm vi đã chốt

Chỉ thay đổi ngôn ngữ cho phần giao diện tĩnh trên frontend:

- Header, navigation và mobile menu.
- Language Switcher.
- Nút, link hành động, placeholder và empty state.
- Form liên hệ và thông báo validation/demo.
- Nhãn accessibility như `aria-label`, `title` và skip-link.
- Một số nhãn trình bày tĩnh trên product/search page.

Không dịch và không thay đổi:

- Nội dung lấy từ EmDash như tên/mô tả sản phẩm, bài viết và page body.
- Slug và URL hiện tại.
- Query, schema, seed hoặc dữ liệu trong EmDash.
- Cấu trúc `src/pages`.
- Cấu hình Astro i18n routing.

## Giải pháp được chọn

Dùng typed TypeScript dictionary kết hợp cookie `ui_locale`.

```text
src/i18n/ui.ts
  - danh sách locale: vi, en, zh
  - dictionary giao diện
  - kiểm tra locale từ cookie
  - hàm useTranslations()
```

Luồng hoạt động:

1. Mặc định frontend dùng tiếng Việt.
2. Người dùng chọn cờ trong Language Switcher.
3. Switcher lưu `ui_locale=vi|en|zh`, thời hạn một năm.
4. Trang hiện tại được reload, không chuyển sang URL khác.
5. Astro đọc cookie và render lại các chuỗi UI tương ứng.

## Nguyên tắc triển khai

- Dictionary tiếng Việt là nguồn key chuẩn.
- Dictionary tiếng Anh và Trung phải có đủ cùng key; TypeScript báo lỗi nếu thiếu.
- Chuỗi có giá trị động dùng placeholder, ví dụ `View {name}`.
- Component đọc locale bằng `getUiLocale(Astro.cookies)`.
- Không dùng local storage vì server không đọc được khi render HTML.
- Không thay đổi `<html lang="vi">`, vì nội dung chính và CMS vẫn là tiếng Việt. Locale được chọn chỉ là `data-ui-locale`, không phải content locale.
- Response dùng UI locale khác `vi` được loại khỏi Astro route cache để tránh trả giao diện cá nhân hóa của một người cho người khác.
- Các tên riêng và dữ liệu không cần dịch như hotline, email, tên công ty và URL được giữ nguyên.

## Các file chính

- `src/i18n/ui.ts`
- `src/data/languages.ts`
- `src/data/navigation.ts`
- `src/components/header/LanguageSwitcher.astro`
- `src/components/header/*`
- `src/components/footer/*`
- `src/components/home/*`
- `src/modules/products/components/*`
- `src/layouts/Base.astro`
- Các trang có button/label tĩnh như search, product detail và 404.

## Kiểm thử

### Language Switcher

- Chọn `en`/`zh` không thay đổi pathname hoặc query string.
- Reload và điều hướng sang trang khác vẫn giữ ngôn ngữ đã chọn.
- Chọn lại `vi` khôi phục giao diện tiếng Việt.
- Locale cookie không hợp lệ tự fallback về `vi`.
- Locale hiện tại có `aria-current` và không thể bấm lại.

### UI

- Header và mobile navigation đổi ngôn ngữ.
- Search placeholder/nút/empty state đổi ngôn ngữ.
- Product action, carousel controls và catalogue CTA đổi ngôn ngữ.
- Contact form, validation message và toast đổi ngôn ngữ.
- Các `aria-label` liên quan đổi theo locale.
- Nội dung CMS, product name, article title và URL giữ nguyên.

### Quality gate

- `npm run typecheck`.
- `npm run build`.
- Smoke test trên desktop và mobile cho cả ba locale.
- Kiểm tra response cache ở môi trường Cloudflare preview.

## Giới hạn có chủ ý

Đây là UI translation, không phải website multilingual hoàn chỉnh:

- Không có URL riêng cho từng ngôn ngữ.
- Không có canonical hoặc `hreflang` theo locale UI.
- Search vẫn tìm trên nội dung tiếng Việt.
- Nội dung CMS có thể vẫn là tiếng Việt khi nút đang hiển thị English/中文.

Nếu sau này cần dịch cả content và SEO, có thể nâng cấp sang Astro built-in i18n + EmDash translations mà không phải bỏ dictionary UI này.
