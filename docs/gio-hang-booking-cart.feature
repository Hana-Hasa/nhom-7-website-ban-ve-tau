# Language: vi
@gio-hang-booking-cart
Feature: Giỏ hàng - Quản lý vé đã chọn
  Là một khách hàng đang đặt vé tàu
  Tôi muốn xem danh sách các vé tôi đã chọn nhưng chưa thanh toán
  Để tôi có thể kiểm tra lại thông tin, xóa bớt hoặc tiến hành thanh toán tất cả cùng lúc

  Background:
    Given tôi đang ở trang chủ hoặc bất kỳ trang nào của website
    And tôi nhìn thấy biểu tượng giỏ hàng trên thanh điều hướng (Header)

  @truy-cap-gio-hang
  Scenario: Truy cập giỏ hàng từ trang chủ
    Given tôi có ít nhất 1 vé trong giỏ hàng
    When tôi nhấp vào biểu tượng giỏ hàng
    Then tôi được chuyển đến trang "Giỏ hàng của tôi"
    And tôi thấy danh sách các vé đã chọn

  @xem-danh-sach-ve
  Scenario: Xem chi tiết các vé trong giỏ hàng
    Given tôi đang ở trang giỏ hàng
    Then mỗi vé trong danh sách phải hiển thị:
      """
      - Thông tin tàu (Số hiệu, Ngày giờ)
      - Thông tin chỗ ngồi (Toa, Số ghế, Loại ghế)
      - Giá vé
      - Nút xóa vé
      """
    And tôi thấy tổng số tiền phải thanh toán

  @gio-hang-trong
  Scenario: Giỏ hàng trống
    Given tôi chưa chọn vé nào
    When tôi nhấp vào biểu tượng giỏ hàng
    Then tôi thấy thông báo "Giỏ hàng của bạn đang trống"
    And tôi thấy nút "Tìm vé ngay" để quay lại trang chủ

  @responsive-mobile-cart
  Scenario: Hiển thị giỏ hàng trên Mobile
    Given tôi sử dụng thiết bị di động
    And tôi truy cập trang giỏ hàng
    Then danh sách vé phải hiển thị dạng thẻ (card) dọc
    And nút "Thanh toán" phải ghim ở dưới cùng màn hình
    And icon giỏ hàng trên Header phải có badge số lượng vé

  @responsive-desktop-cart
  Scenario: Hiển thị giỏ hàng trên Desktop
    Given tôi sử dụng máy tính desktop
    Then danh sách vé hiển thị dạng bảng (table) hoặc danh sách chi tiết
    And cột tổng tiền và nút thanh toán hiển thị bên phải (sidebar)
