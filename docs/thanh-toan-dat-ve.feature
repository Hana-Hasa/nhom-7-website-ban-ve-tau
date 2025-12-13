# Language: vi
@thanh-toan-dat-ve
Feature: Thanh toán và Đặt vé
  Là một khách hàng đã chọn vé
  Tôi muốn nhập thông tin hành khách và thanh toán qua ngân hàng
  Để hoàn tất việc mua vé và nhận mã đặt chỗ

  Background:
    Given tôi có ít nhất 1 vé trong giỏ hàng
    And tôi đang ở trang "Giỏ hàng"
    When tôi nhấn nút "Thanh toán ngay"
    Then tôi được chuyển đến trang "Thanh toán & Đặt vé"

  @nhap-thong-tin
  Scenario: Nhập thông tin hành khách
    Given tôi đang ở trang thanh toán
    Then tôi phải thấy form nhập thông tin cho người đặt vé:
      """
      - Họ và tên
      - Số điện thoại
      - Email
      - Số CMND/CCCD
      """
    And tôi thấy tóm tắt thông tin các vé đang mua

  @chon-phuong-thuc-thanh-toan
  Scenario: Thanh toán qua Ngân hàng
    Given tôi đã nhập đầy đủ thông tin hành khách
    When tôi chọn phương thức thanh toán "Chuyển khoản Ngân hàng"
    Then hệ thống hiển thị thông tin chuyển khoản:
      """
      - Tên ngân hàng
      - Số tài khoản
      - Tên chủ tài khoản
      - Nội dung chuyển khoản (Mã đơn hàng)
      - Mã QR (tùy chọn)
      """
    And tôi thấy nút "Xác nhận đã chuyển khoản" hoặc "Hoàn tất đặt vé"

  @khuyen-mai
  Scenario: Áp dụng mã khuyến mãi
    Given tôi đang ở trang thanh toán
    Then tôi thấy danh sách các khuyến mãi thường xuyên
    When tôi chọn một khuyến mãi từ danh sách
    Or tôi nhập mã khuyến mãi riêng "KMRIENG123"
    Then tổng tiền thanh toán được giảm tương ứng
    And hệ thống hiển thị số tiền được giảm

  @chinh-sua-don-hang
  Scenario: Chỉnh sửa đơn hàng tại trang thanh toán
    Given tôi đang xem tóm tắt đơn hàng
    When tôi muốn thay đổi số lượng hoặc loại bỏ vé
    Then tôi có thể thực hiện xóa vé trực tiếp hoặc quay lại giỏ hàng
    And tổng tiền thanh toán được cập nhật ngay lập tức

  @san-pham-mua-kem
  Scenario: Gợi ý sản phẩm mua kèm
    Given tôi đang ở trang thanh toán
    Then tôi thấy danh sách "Sản phẩm nên mua kèm" (đồ ăn, nước uống)
    When tôi chọn thêm một sản phẩm
    Then sản phẩm đó được thêm vào đơn hàng
    And tổng tiền thanh toán tăng lên tương ứng

  @hoan-tat-dat-ve
  Scenario: Hoàn tất đặt vé
    Given tôi đã thực hiện chuyển khoản
    When tôi nhấn nút "Hoàn tất đặt vé"
    Then hệ thống thông báo "Đặt vé thành công"
    And tôi nhận được mã đặt chỗ và email xác nhận

  @responsive-mobile-checkout
  Scenario: Giao diện Thanh toán trên Mobile
    Given tôi sử dụng thiết bị di động
    Then form thông tin và phần tóm tắt đơn hàng phải hiển thị dọc (mỗi phần 1 cột)
    And thông tin thông chuyển khoản phải rõ ràng, dễ đọc không cần zoom
    And nút "Hoàn tất" phải ghim dưới cùng hoặc dễ thao tác
