# Language: vi
@tin-tuc-blog
Feature: Tin tức và Blog
  Là một người dùng truy cập website
  Tôi muốn xem các bài viết tin tức và khuyến mãi
  Để cập nhật thông tin mới nhất về đường sắt và du lịch

  Background:
    Given tôi đang ở trang chủ hoặc menu chính
    When tôi nhấn vào liên kết "Tin tức"
    Then tôi được chuyển đến trang "Tin tức & Sự kiện"

  @danh-sach-tin-tuc
  Scenario: Xem danh sách bài viết
    Given tôi đang ở trang tin tức
    Then tôi thấy danh sách ít nhất 8 bài viết mới nhất
    And mỗi bài viết hiển thị:
      | Thông tin        | Mô tả                                |
      | Hình ảnh         | Ảnh đại diện bài viết                |
      | Tiêu đề          | Tên bài viết (tối đa 2 dòng)         |
      | Tóm tắt          | Mô tả ngắn gọn nội dung              |
      | Ngày đăng        | Thời gian xuất bản                   |
    And tôi thấy phân trang nếu số lượng bài viết nhiều hơn 8

  @chi-tiet-tin-tuc
  Scenario: Xem chi tiết bài viết
    Given tôi đang ở danh sách tin tức
    When tôi nhấn vào một bài viết bất kỳ
    Then tôi được chuyển đến trang chi tiết bài viết đó
    And trang chi tiết hiển thị đầy đủ:
      - Tiêu đề lớn
      - Nội dung bài viết với định dạng (văn bản, ảnh)
      - Bài viết liên quan ở cuối trang

  @responsive-mobile-news
  Scenario: Giao diện Tin tức trên Mobile
    Given tôi sử dụng thiết bị di động
    When tôi truy cập trang tin tức
    Then danh sách bài viết hiển thị dạng dọc (1 cột) thay vì lưới nhiều cột
    And hình ảnh bài viết tự động co giãn theo chiều rộng màn hình
    And nội dung chi tiết bài viết có cỡ chữ dễ đọc không cần zoom
