# Language: vi
@tai-khoan-khach-hang
Feature: Tài khoản Khách hàng
  Là một khách hàng đã đăng nhập
  Tôi muốn xem thông tin tài khoản và lịch sử hoạt động
  Để quản lý các vé đã đặt và lưu trữ các chuyến đi yêu thích

  Background:
    Given tôi đã đăng nhập vào hệ thống
    And tôi đang ở trang "Trang chủ"
    When tôi nhấn vào avatar hoặc tên tài khoản ở Header
    Then tôi được chuyển đến trang "Tài khoản của tôi"

  @thong-ke-tai-khoan
  Scenario: Xem thống kê hoạt động
    Given tôi đang ở trang tài khoản
    Then tôi thấy bảng thống kê tổng quan bao gồm:
      | Thông tin             | Mô tả                                   |
      | Sản phẩm đã xem       | Danh sách các chuyến tàu vừa xem gần đây|
      | Đơn hàng đã mua       | Các vé đã thanh toán thành công         |
      | Đơn hàng đang xử lý   | Các vé đang chờ thanh toán hoặc giữ chỗ |
    And tôi có thể nhấn vào từng mục để xem chi tiết

  @danh-sach-yeu-thich
  Scenario: Quản lý Danh sách yêu thích (Bộ sưu tập)
    Given tôi đang ở trang tài khoản
    When tôi chọn tab "Danh sách yêu thích" hoặc "Bộ sưu tập"
    Then tôi thấy danh sách các chuyến tàu tôi đã đánh dấu tim
    And tôi có thể:
      - Bỏ yêu thích
      - Đặt vé nhanh từ danh sách này

  @responsive-mobile-account
  Scenario: Giao diện Tài khoản trên Mobile
    Given tôi sử dụng thiết bị di động
    When tôi truy cập trang tài khoản
    Then menu điều hướng (Thống kê, Yêu thích, Cài đặt) phải hiển thị dạng tab ngang hoặc menu trượt
    And danh sách lịch sử đơn hàng phải hiển thị gọn gàng (Card view) thay vì Bảng (Table)
