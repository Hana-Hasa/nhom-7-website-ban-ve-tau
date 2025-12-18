# Feature: Bug - Placeholder Text bị mờ trên các trình duyệt

## Mô tả bug
Placeholder text trong các input fields bị hiển thị quá mờ/nhạt màu trên một số trình duyệt, gây khó khăn cho người dùng trong việc đọc và hiểu nội dung gợi ý. Vấn đề này ảnh hưởng đến trải nghiệm người dùng (UX) và khả năng accessibility của website.

## Mức độ nghiêm trọng
**Priority:** Medium  
**Severity:** Minor UI Issue  
**Impact:** Affects user experience and accessibility

## Browsers bị ảnh hưởng
- Safari (iOS 14+, macOS)
- Chrome (Windows, macOS, Android)
- Firefox (Windows, macOS)
- Microsoft Edge (Windows)
- Samsung Internet (Android)

---

## Bug Report

### Background:
```gherkin
Given website bán vé tàu đã được deploy
And người dùng có thể truy cập từ các trình duyệt khác nhau
And các input fields có placeholder text
```

---

## Scenario 1: Placeholder text bị mờ trên Safari iOS

```gherkin
Feature: Kiểm tra placeholder text trên Safari iOS

Background:
  Given người dùng sử dụng Safari trên iPhone
  And đang truy cập trang "Tìm kiếm chuyến tàu"
  And có ánh sáng môi trường bình thường

Scenario: Kiểm tra độ tương phản của placeholder trên input "Ga đi"
  Given người dùng nhìn vào input field "Ga đi"
  When input field chưa có giá trị (empty state)
  Then placeholder text "Chọn ga đi" phải hiển thị
  But placeholder text hiển thị rất mờ
  And màu sắc của placeholder là rgba(0, 0, 0, 0.3) hoặc tương tự
  And contrast ratio giữa text và background < 3:1
  And người dùng phải nhìn kỹ mới đọc được text

Scenario: So sánh với text thực tế khi đã nhập
  Given người dùng đã nhập "Hà Nội" vào input field
  When giá trị được hiển thị
  Then màu text là rgba(0, 0, 0, 1) (đen đậm)
  And text rõ ràng, dễ đọc
  And contrast ratio ≥ 4.5:1
  And sự chênh lệch giữa placeholder và text thực rất lớn

Scenario: Kiểm tra trong điều kiện ánh sáng mạnh
  Given người dùng đang ở ngoài trời có ánh sáng mặt trời mạnh
  When người dùng nhìn vào màn hình điện thoại
  And màn hình brightness đã được tăng lên maximum
  Then placeholder text gần như không thể đọc được
  And người dùng phải che màn hình mới đọc được
  And trải nghiệm người dùng bị ảnh hưởng nghiêm trọng

Scenario: Kiểm tra accessibility cho người khiếm thị màu
  Given người dùng có khiếm khuyết về thị lực (low vision)
  When người dùng cố gắng đọc placeholder text
  Then họ không thể phân biệt được placeholder với background
  And không biết input field có placeholder hay không
  And phải sử dụng screen reader để biết nội dung
```

---

## Scenario 2: Placeholder text bị mờ trên Chrome Desktop

```gherkin
Feature: Kiểm tra placeholder text trên Chrome Desktop

Background:
  Given người dùng sử dụng Google Chrome trên Windows/macOS
  And đang ở trang "Tìm kiếm chuyến tàu"
  And độ phân giải màn hình là 1920x1080

Scenario: Kiểm tra placeholder trên input "Ga đến"
  Given người dùng focus vào input field "Ga đến"
  When input field ở trạng thái empty
  Then placeholder "Chọn ga đến" hiển thị
  But màu sắc của placeholder chỉ là #999999 hoặc nhạt hơn
  And opacity của placeholder ≤ 0.5
  And text mờ hơn so với các label bên cạnh
  
Scenario: Placeholderختفي khi focus
  Given placeholder đang hiển thị trong input
  When người dùng click vào input field
  Then placeholder vẫn hiển thị (không biến mất)
  And cursor nhấp nháy bên trong input
  But do placeholder quá mờ nên cursor khó nhìn thấy

Scenario: So sánh với thiết kế mockup
  Given designer đã cung cấp mockup với placeholder màu #666666
  When nhìn vào implementation thực tế
  Then màu placeholder thực tế là #CCCCCC (nhạt hơn nhiều)
  And opacity thực tế là 0.4 thay vì 0.7 trong design
  And không khớp với design specification
```

---

## Scenario 3: Placeholder text bị mờ trên Firefox

```gherkin
Feature: Kiểm tra placeholder text trên Firefox

Background:
  Given người dùng sử dụng Mozilla Firefox
  And đang ở trang "Tìm kiếm chuyến tàu"

Scenario: Firefox áp dụng opacity mặc định cho placeholder
  Given Firefox có CSS user agent stylesheet riêng
  When render placeholder text
  Then Firefox tự động áp dụng opacity: 0.54 cho placeholder
  And màu sắc bị giảm độ đậm đáng kể
  And khác biệt với Chrome (opacity: 1 với màu nhạt)
  And developer cần override với :-moz-placeholder

Scenario: Kiểm tra input "Ngày đi"
  Given input field "Ngày đi" có placeholder "DD/MM/YYYY"
  When người dùng chưa chọn ngày
  Then placeholder hiển thị với opacity mặc định của Firefox
  And text rất mờ, khó đọc
  And format date placeholder không rõ ràng

Scenario: High contrast mode của Firefox
  Given người dùng bật High Contrast mode trong Firefox
  When xem trang web
  Then placeholder vẫn bị mờ
  And không được boost contrast như các elements khác
  And vẫn vi phạm accessibility guidelines
```

---

## Scenario 4: Placeholder text bị mờ trên Microsoft Edge

```gherkin
Feature: Kiểm tra placeholder text trên Microsoft Edge

Background:
  Given người dùng sử dụng Microsoft Edge (Chromium-based)
  And đang ở trang "Kết quả tìm kiếm"

Scenario: Placeholder trong search box
  Given có search box để lọc kết quả với placeholder "Tìm kiếm..."
  When người dùng nhìn vào search box
  Then placeholder text màu #A0A0A0
  And opacity = 0.5
  And tổng thể màu cuối cùng rất nhạt
  And gần như blend vào background trắng

Scenario: Kiểm tra focus state
  Given search box đang có placeholder
  When người dùng focus vào input
  Then placeholder vẫn hiển thị mờ
  And không có visual feedback rõ ràng
  And người dùng không chắc chắn liệu input đã được focus

Scenario: Dark mode behavior
  Given người dùng đang dùng Windows dark mode
  When Edge tự động chuyển sang dark theme
  Then background input chuyển sang màu tối
  But placeholder vẫn giữ opacity 0.5
  And placeholder màu sáng với opacity thấp = khó đọc hơn
  And contrast ratio càng tệ hơn
```

---

## Scenario 5: Placeholder trên mobile browsers (Chrome Android, Samsung Internet)

```gherkin
Feature: Kiểm tra placeholder text trên mobile browsers

Scenario: Chrome Android - màn hình nhỏ
  Given người dùng sử dụng Chrome trên điện thoại Android
  And kích thước màn hình 6 inches, 1080x2400
  When xem trang tìm kiếm trên mobile
  Then placeholder text size = 14px (smaller)
  And màu sắc = rgba(0, 0, 0, 0.38) (Material Design default)
  And kết hợp size nhỏ + màu nhạt = rất khó đọc
  And người dùng cao tuổi gần như không đọc được

Scenario: Samsung Internet - outdoor usage
  Given người dùng sử dụng Samsung Internet
  And đang ở ngoài trời có ánh sáng mặt trời
  When cố gắng đọc placeholder trong input
  Then placeholder gần như invisible
  And người dùng phải che màn hình bằng tay
  And phải thử nhập text mới biết input này dùng để làm gì

Scenario: Touch target và placeholder visibility
  Given input field có height 48px (touch target)
  And placeholder text 14px
  When người dùng cố đọc placeholder
  Then có nhiều khoảng trống (padding)
  And placeholder text nằm giữa khoảng trống
  And màu nhạt làm text càng khó nhìn hơn trong không gian rộng
```

---

## Root Cause Analysis

```gherkin
Feature: Phân tích nguyên nhân gốc rẽ

Scenario: CSS implementation hiện tại
  Given developer đã implement placeholder styles
  When kiểm tra CSS code
  Then có thể thấy các vấn đề sau:
    | Vấn đề | Mô tả |
    | Không có explicit color | Dùng browser default |
    | Opacity mặc định | Browser tự áp dụng opacity 0.3-0.54 |
    | Thiếu vendor prefixes | Không override ::placeholder, :-ms-input-placeholder, ::-moz-placeholder |
    | Không test contrast | Không kiểm tra WCAG AA compliance |
    | Thiếu dark mode handling | Không adjust cho dark background |

Scenario: Browser default behavior
  Given mỗi browser có user agent stylesheet riêng
  Then mỗi browser render placeholder khác nhau:
    | Browser | Default placeholder style |
    | Chrome | color: #757575, opacity: 1 |
    | Safari | color: rgba(0,0,0,0.3) |
    | Firefox | opacity: 0.54 |
    | Edge | color: #767676, opacity: 0.6 |
  And không có consistency giữa các browsers
  And nếu developer không override thì sẽ bị inconsistent

Scenario: Accessibility không được ưu tiên
  Given WCAG 2.1 AA yêu cầu contrast ratio ≥ 4.5:1 cho text
  When kiểm tra placeholder contrast
  Then hầu hết placeholder có ratio < 3:1
  And vi phạm accessibility guidelines
  And người khiếm thị, cao tuổi không sử dụng được
```

---

## Reproduction Steps

```gherkin
Feature: Các bước tái hiện bug

Scenario: Tái hiện bug trên Safari iOS
  Given mở Safari trên iPhone
  When navigate đến https://nhom-7-website-ban-ve-tau.vercel.app
  And scroll đến form "Tìm kiếm chuyến tàu"
  Then observe placeholder text trong input "Ga đi"
  And so sánh với label "Ga đi" phía trên
  And nhận thấy placeholder text mờ hơn rất nhiều

Scenario: Tái hiện bug trên Chrome Desktop
  Given mở Chrome trên Windows/macOS
  When navigate đến website
  And inspect element input field
  And check computed styles trong DevTools
  Then thấy placeholder có opacity: 0.54
  And color: rgb(117, 117, 117)
  And contrast ratio với white background = 2.8:1 (FAIL)

Scenario: Tái hiện bug với WebAIM Contrast Checker
  Given sử dụng công cụ WebAIM Contrast Checker
  When nhập:
    | Foreground (placeholder) | #BBBBBB |
    | Background (input) | #FFFFFF |
  Then kết quả hiển thị:
    | Metric | Value | Pass/Fail |
    | Contrast ratio | 2.5:1 | FAIL |
    | WCAG AA normal text | Required 4.5:1 | FAIL |
    | WCAG AAA | Required 7:1 | FAIL |
```

---

## Expected vs Actual Behavior

```gherkin
Feature: So sánh kết quả mong đợi và thực tế

Scenario: Expected behavior
  Given người dùng truy cập form tìm kiếm
  When nhìn vào input fields
  Then placeholder text phải:
    | Tiêu chí | Mong đợi |
    | Màu sắc | #666666 hoặc tối hơn |
    | Opacity | 0.8 - 1.0 |
    | Contrast ratio | ≥ 4.5:1 (WCAG AA) |
    | Dễ đọc | Có |
    | Nhất quán giữa browsers | Có |
  And người dùng dễ dàng hiểu input field yêu cầu thông tin gì
  And không cần nhìn kỹ hoặc zoom in

Scenario: Actual behavior
  Given người dùng truy cập form tìm kiếm
  When nhìn vào input fields
  Then placeholder text thực tế:
    | Tiêu chí | Thực tế |
    | Màu sắc | #BBBBBB - #CCCCCC (quá nhạt) |
    | Opacity | 0.3 - 0.54 (quá thấp) |
    | Contrast ratio | 2.5:1 - 3.2:1 (FAIL WCAG) |
    | Dễ đọc | Không |
    | Nhất quán giữa browsers | Không |
  And người dùng phải nhìn kỹ mới đọc được
  And người cao tuổi/khiếm thị gặp khó khăn lớn
```

---

## Proposed Solution

```gherkin
Feature: Giải pháp đề xuất

Scenario: Override browser defaults với CSS custom
  Given cần fix placeholder text color/opacity
  When implement CSS sau:
  """css
  /* Global placeholder styles */
  ::placeholder {
    color: #666666;
    opacity: 1;
  }
  
  /* Firefox */
  :-moz-placeholder {
    color: #666666;
    opacity: 1;
  }
  
  ::-moz-placeholder {
    color: #666666;
    opacity: 1;
  }
  
  /* Internet Explorer 10-11 */
  :-ms-input-placeholder {
    color: #666666;
    opacity: 1;
  }
  
  /* Microsoft Edge */
  ::-ms-input-placeholder {
    color: #666666;
    opacity: 1;
  }
  
  /* WebKit browsers (Safari, Chrome) */
  ::-webkit-input-placeholder {
    color: #666666;
    opacity: 1;
  }
  """
  Then placeholder text sẽ có màu #666666 trên mọi browsers
  And opacity = 1 (không bị mờ)
  And contrast ratio ≈ 5.7:1 (PASS WCAG AA)

Scenario: Dark mode support
  When implement dark mode
  Then cần adjust placeholder cho dark background:
  """css
  @media (prefers-color-scheme: dark) {
    ::placeholder {
      color: #AAAAAA;
      opacity: 1;
    }
    
    /* All vendor prefixes same as above */
  }
  """
  And placeholder sáng hơn trên nền tối
  And vẫn đảm bảo contrast ratio

Scenario: Tailwind CSS implementation
  Given project sử dụng Tailwind CSS
  When cần apply placeholder styles
  Then sử dụng utility classes:
  """jsx
  <input
    className="placeholder:text-gray-600 placeholder:opacity-100"
    placeholder="Chọn ga đi"
  />
  """
  Or configure trong globals.css:
  """css
  @layer base {
    ::placeholder {
      @apply text-gray-600 opacity-100;
    }
  }
  """
  Then Tailwind sẽ generate đúng vendor prefixes
  And đảm bảo consistency

Scenario: Testing solution
  Given đã implement CSS fix
  When test trên các browsers:
    | Browser | Version | Device |
    | Safari | 17+ | iPhone 15 |
    | Chrome | 120+ | Windows 11 |
    | Firefox | 121+ | macOS |
    | Edge | 120+ | Windows 11 |
  Then tất cả phải hiển thị placeholder màu #666666
  And opacity = 1
  And contrast ratio ≥ 4.5:1
  And dễ đọc trên mọi devices
```

---

## Verification Checklist

```gherkin
Feature: Checklist xác nhận bug đã được fix

Scenario: Manual testing checklist
  Given đã deploy fix lên production/staging
  Then kiểm tra các items sau:
  
  Visual Testing:
    [ ] Placeholder text rõ ràng, dễ đọc trên Safari iOS
    [ ] Placeholder text rõ ràng, dễ đọc trên Chrome Desktop
    [ ] Placeholder text rõ ràng, dễ đọc trên Firefox
    [ ] Placeholder text rõ ràng, dễ đọc trên Edge
    [ ] Placeholder text rõ ràng, dễ đọc trên Chrome Android
    [ ] Placeholder text nhất quán giữa các browsers
  
  Accessibility Testing:
    [ ] Contrast ratio ≥ 4.5:1 (use WebAIM Contrast Checker)
    [ ] Readable dưới ánh sáng mặt trời (outdoor test)
    [ ] Readable cho người cao tuổi
    [ ] Readable ở low brightness settings
    [ ] Pass accessibility audit (Chrome Lighthouse)
  
  Responsive Testing:
    [ ] Desktop (1920x1080)
    [ ] Laptop (1366x768)
    [ ] Tablet (768x1024)
    [ ] Mobile (375x667)
    [ ] Mobile landscape
  
  Dark Mode Testing:
    [ ] Light mode - placeholder clearly visible
    [ ] Dark mode - placeholder clearly visible
    [ ] Auto theme switch works correctly
  
  Cross-browser DevTools Testing:
    [ ] Chrome DevTools - computed color matches #666666
    [ ] Firefox DevTools - computed opacity = 1
    [ ] Safari Inspector - no default opacity override
    [ ] Edge DevTools - consistent with other browsers

Scenario: Automated testing
  Given có automated test suite
  Then thêm visual regression tests:
  """javascript
  describe('Placeholder text visibility', () => {
    test('placeholder should have correct color', async () => {
      const input = await page.$('input[placeholder]');
      const color = await input.evaluate(el => 
        window.getComputedStyle(el, '::placeholder').color
      );
      expect(color).toBe('rgb(102, 102, 102)'); // #666666
    });
    
    test('placeholder should have full opacity', async () => {
      const input = await page.$('input[placeholder]');
      const opacity = await input.evaluate(el =>
        window.getComputedStyle(el, '::placeholder').opacity
      );
      expect(parseFloat(opacity)).toBe(1);
    });
    
    test('placeholder contrast ratio should pass WCAG AA', async () => {
      const contrastRatio = await checkContrast('#666666', '#FFFFFF');
      expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
    });
  });
  """
```

---

## Additional Notes

**Related Issues:**
- Typography inconsistency across browsers
- Form accessibility improvements needed
- Dark mode placeholder colors need review

**Files to modify:**
- `src/app/globals.css` - Add global placeholder styles
- Component-specific CSS if using CSS modules
- Tailwind config if using Tailwind
