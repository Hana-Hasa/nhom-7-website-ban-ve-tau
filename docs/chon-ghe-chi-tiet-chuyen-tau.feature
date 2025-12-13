# Language: vi
@chon-ghe-chi-tiet-chuyen-tau
Feature: Trang Chi tiết chuyến tàu và Chọn chỗ ngồi
  Là một khách hàng muốn đặt vé tàu
  Tôi muốn xem thông tin chi tiết chuyến tàu, chọn toa, chọn chỗ ngồi và các dịch vụ đi kèm
  Để hoàn tất quá trình đặt vé theo ý muốn

  Background:
    Given tôi đang ở trang chủ
    And tôi nhìn thấy danh sách các chuyến tàu (Sản phẩm xu hướng/Bán chạy)
    When tôi nhấp vào nút "Xem chi tiết" của một chuyến tàu
    Then tôi được chuyển đến trang chi tiết chuyến tàu và chọn chỗ ngồi

  @thong-tin-chuyen-tau
  Scenario: Xem thông tin chi tiết chuyến tàu
    Given tôi ở trang chọn ghế
    Then tôi phải thấy thông tin chuyến tàu:
      """
      - Ga đi - Ga đến
      - Ngày giờ khởi hành
      - Tổng thời gian di chuyển
      - Số hiệu tàu
      """

  @chon-toa-tau
  Scenario: Chọn toa tàu
    Given tôi nhìn thấy danh sách các toa tàu
    When tôi chọn toa số 1
    Then danh sách ghế của toa số 1 phải được hiển thị
    And hệ thống phải hiển thị trạng thái toa (số ghế trống/đầy)
  
  @chon-cho-ngoi
  Scenario: Chọn chỗ ngồi
    Given tôi đang xem danh sách ghế của một toa
    When tôi chọn một ghế trống (màu trắng)
    Then ghế đó phải chuyển sang trạng thái đang chọn (màu vàng/xanh)
    And thông tin vé tạm tính phải được cập nhật bên thanh bên phải
    But nếu tôi chọn ghế đã đặt (màu đỏ)
    Then hệ thống phải thông báo ghế này không khả dụng

  @san-pham-lien-quan
  Scenario: Xem sản phẩm liên quan (Dịch vụ ăn uống/đồ lưu niệm)
    Given tôi đang ở trang chi tiết chuyến tàu
    Then tôi phải thấy phần "Sản phẩm/Dịch vụ liên quan"
    And danh sách phải hiển thị:
      """
      - Suất ăn trên tàu
      - Nước uống
      - Dịch vụ gửi hành lý
      """

  @san-pham-mua-cung
  Scenario: Gợi ý sản phẩm thường mua cùng
    Given tôi đã chọn một vé hoặc dịch vụ
    Then hệ thống hiển thị phần "Thường được mua cùng"
    And danh sách gợi ý phải dựa trên lịch sử hoặc logic phù hợp

  @binh-luan-danh-gia
  Scenario: Bình luận và đánh giá chuyến tàu/dịch vụ
    Given tôi đang xem thông tin chuyến tàu
    Then tôi phải thấy phần bình luận và đánh giá từ khách hàng trước
    When tôi đăng nhập
    And tôi gửi bình luận "Dịch vụ tốt" và đánh giá 5 sao
    Then bình luận của tôi phải được ghi nhận và hiển thị (sau khi duyệt nếu có)

  @responsive-mobile-booking
  Scenario: Giao diện Mobile - Chọn ghế
    Given tôi sử dụng thiết bị di động (màn hình < 768px)
    Then sơ đồ toa tàu phải hiển thị dạng cuộn ngang hoặc dọc phù hợp
    And nút "Chọn ghế" và "Thanh toán" phải ghim ở dưới cùng hoặc dễ thao tác
    And các thông tin phụ (sản phẩm liên quan) được xếp dưới cùng

  @responsive-tablet-booking
  Scenario: Giao diện Tablet - Chọn ghế
    Given tôi sử dụng tablet
    Then layout hiển thị cột bên trái là sơ đồ ghế, bên phải là thông tin vé
    And các thao tác chạm phải mượt mà

  @responsive-desktop-booking
  Scenario: Giao diện Desktop - Chọn ghế
    Given tôi sử dụng desktop
    Then tôi thấy toàn cảnh sơ đồ toa tàu và giỏ hàng cùng lúc
    And các hiệu ứng hover ghế phải hiển thị chi tiết giá/loại ghế
