# Language: vi
@website-ban-ve-tau
Feature: Website bán vé tàu lửa Việt Nam
  Là một khách hàng muốn mua vé tàu lửa
  Tôi muốn sử dụng website bán vé tàu lửa với màu chủ đạo xanh dương đậm và đỏ
  Để có thể tìm kiếm, chọn và mua vé tàu lửa dễ dàng

  Background:
    Given tôi truy cập vào trang chủ website bán vé tàu lửa
    Then trang web phải có màu chủ đạo là xanh dương đậm và đỏ
    And trang web hiển thị giao diện tiếng Việt có dấu

  @trang-chu
  Scenario: Xem giao diện trang chủ
    Given tôi ở trang chủ
    Then tôi phải thấy các thành phần chính:
      """
      - Logo và tên thương hiệu
      - Thanh điều hướng chính
      - Slide giới thiệu khuyến mãi
      - Sản phẩm/Dịch vụ xu hướng
      - Sản phẩm/Dịch vụ bán chạy
      - Chân trang
      """
    And tất cả nội dung phải được hiển thị bằng tiếng Việt có dấu

  @slide-khuyen-mai
  Scenario: Xem slide giới thiệu khuyến mãi
    Given tôi ở trang chủ
    Then tôi phải thấy slide giới thiệu với các sự kiện:
      """
      - Chương trình khuyến mãi
      - Flash sale
      - Sự kiện Trung Thu
      - Sự kiện Năm mới
      """
    And slide phải tự động chuyển đổi sau 5 giây
    And tôi có thể điều khiển slide bằng nút next/prev
    And tôi có thể chọn trực tiếp các dots để chuyển slide

  @slide-manual-control
  Scenario: Điều khiển slide thủ công
    Given tôi nhìn thấy slide giới thiệu
    When tôi nhấp vào nút tiếp theo
    Then slide phải chuyển đến hình ảnh tiếp theo
    When tôi nhấp vào nút trước đó
    Then slide phải chuyển về hình ảnh trước đó
    When tôi nhấp vào dots thứ 3
    Then slide phải chuyển đến slide thứ 3

  @san-pham-xu-huong
  Scenario: Xem sản phẩm/dịch vụ xu hướng
    Given tôi ở trang chủ
    Then tôi phải thấy section "Sản phẩm/Dịch vụ xu hướng"
    And mỗi sản phẩm phải hiển thị:
      """
      - Hình ảnh sản phẩm
      - Tên sản phẩm/dịch vụ
      - Giá bán
      - Giá giảm (nếu có)
      - % giảm giá (nếu có)
      - Số lượt bình luận
      """

  @san-pham-ban-chay
  Scenario: Xem sản phẩm/dịch vụ bán chạy
    Given tôi ở trang chủ
    When tôi kéo xuống section "Sản phẩm/Dịch vụ bán chạy"
    Then tôi phải thấy danh sách các sản phẩm bán chạy
    And mỗi sản phẩm phải có đầy đủ thông tin giá và bình luận

  @hieu-ung-hover-anh
  Scenario: Hiệu ứng hover trên hình ảnh sản phẩm
    Given tôi thấy một sản phẩm trong danh sách
    When tôi đưa chuột lên hình ảnh sản phẩm
    Then hình ảnh sản phẩm phải phóng to 1.1 lần
    And hiệu ứng phóng to phải mượt mà trong 0.3 giây
    When tôi di chuột ra khỏi hình ảnh
    Then hình ảnh phải trở lại kích thước ban đầu

  @hieu-ung-binh-luan
  Scenario: Hiệu ứng hover trên bình luận
    Given tôi thấy một sản phẩm có bình luận
    When tôi đưa chuột lên phần bình luận
    Then phải hiển thị popup thống kê cơ bản:
      """
      - Tổng số bình luận
      - Đánh giá trung bình (sao)
      - Tỷ lệ hài lòng
      """
    And popup phải nằm ngang với con trỏ chuột
    When tôi di chuột ra khỏi khu vực bình luận
    Then popup thống kê phải biến mất

  @gia-san-pham
  Scenario: Hiển thị giá sản phẩm
    Given tôi xem một sản phẩm đang có khuyến mãi
    Then tôi phải thấy:
      """
      - Giá gạch (giá gốc) bị gạch ngang
      - Giá giảm màu đỏ đậm, font size lớn
      - % giảm giá trong tag màu đỏ
      """
    But nếu sản phẩm không có khuyến mãi
    Then tôi chỉ thấy giá bán bình thường

  @binh-luan-san-pham
  Scenario: Xem và tương tác bình luận
    Given tôi thấy phần bình luận của sản phẩm
    Then tôi phải thấy số lượng bình luận
    When tôi nhấp vào phần bình luận
    Then tôi phải thấy danh sách các bình luận
    And mỗi bình luận phải có:
      """
      - Tên người bình luận
      - Đánh giá (sao)
      - Nội dung bình luận
      - Thời gian bình luận
      """

  @responsive-mobile
  Scenario: Responsive design trên thiết bị di động
    Given tôi truy cập website bằng thiết bị di động (màn hình < 768px)
    Then menu điều hướng phải thu gọn thành icon hamburger
    And slide phải tự động điều chỉnh kích thước
    And sản phẩm phải hiển thị 1 cột
    And các nút phải đủ lớn để nhấp bằng ngón tay
    And text phải đủ lớn để đọc dễ dàng

  @responsive-tablet
  Scenario: Responsive design trên tablet
    Given tôi truy cập website bằng tablet (màn hình 768px - 1024px)
    Then menu điều hướng phải thu gọn nhưng vẫn dễ sử dụng
    And sản phẩm phải hiển thị 2 cột
    And slide phải tự động điều chỉnh kích thước
    And layout phải tối ưu cho cảm ứng

  @responsive-desktop
  Scenario: Responsive design trên desktop
    Given tôi truy cập website bằng desktop (màn hình > 1024px)
    Then menu điều hướng phải hiển thị đầy đủ
    And sản phẩm phải hiển thị 3-4 cột
    And tất cả hiệu ứng phải hoạt động mượt mà
    And layout phải tối ưu cho chuột

  @hieu-ung-chung
  Scenario: Các hiệu ứng UI/UX khác
    Given tôi tương tác với trang web
    Then tất cả các nút phải có hiệu ứng hover
    And các link phải có hiệu ứng chuyển đổi màu
    And loading phải có spinner hoặc skeleton
    And chuyển trang phải mượt mà
    And scroll phải có hiệu ứng parallax ở section hero

  @mau-sac-chu-dao
  Scenario: Kiểm tra màu sắc chủ đạo
    Given tôi duyệt website
    Then các phần tử chính phải sử dụng màu:
      """
      - Xanh dương đậm: #003366 cho header, links chính
      - Đỏ: #CC0000 cho khuyến mãi, giá giảm, call-to-action
      - Xanh dương nhạt: #E6F2FF cho backgrounds
      """
    And màu sắc phải nhất quán trên toàn bộ website