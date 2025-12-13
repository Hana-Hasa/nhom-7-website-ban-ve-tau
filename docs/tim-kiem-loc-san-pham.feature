# Language: vi
@tim-kiem-loc-san-pham
Feature: Tìm kiếm và lọc sản phẩm vé tàu
  Là một khách hàng
  Tôi muốn tìm kiếm và lọc các sản phẩm vé tàu lửa
  Để nhanh chóng tìm được chuyến tàu phù hợp với nhu cầu của mình

  Background:
    Given tôi ở trang chủ hoặc trang danh sách sản phẩm
    Then tôi phải thấy section tìm kiếm và lọc sản phẩm
    And section phải hiển thị bằng tiếng Việt có dấu

  @tim-kiem-co-ban
  Scenario: Tìm kiếm sản phẩm theo từ khóa
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi nhập "Hà Nội" vào ô tìm kiếm
    And tôi nhấn nút "Tìm kiếm"
    Then hệ thống phải hiển thị các chuyến tàu có liên quan đến "Hà Nội"
    And kết quả phải bao gồm:
      """
      - Tàu xuất phát từ Hà Nội
      - Tàu đến Hà Nội
      - Tàu đi qua ga Hà Nội
      """
    And số lượng kết quả phải được hiển thị
    And nếu không tìm thấy kết quả thì phải hiển thị thông báo "Không tìm thấy chuyến tàu nào phù hợp"

  @tim-kiem-theo-ga
  Scenario: Tìm kiếm theo ga đi và ga đến
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi chọn "TP.HCM" trong dropdown ga đi
    And tôi chọn "Hà Nội" trong dropdown ga đến
    And tôi chọn ngày đi
    And tôi nhấn nút "Tìm kiếm"
    Then hệ thống phải hiển thị các chuyến tàu từ TP.HCM đến Hà Nội
    And các chuyến tàu phải được sắp xếp theo giờ đi sớm nhất

  @tim-kiem-voi-loi
  Scenario: Xử lý lỗi khi tìm kiếm
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi chỉ chọn ga đi mà không chọn ga đến
    And tôi nhấn nút "Tìm kiếm"
    Then phải hiển thị thông báo lỗi "Vui lòng chọn ga đến"
    When tôi chỉ chọn ga đến mà không chọn ga đi
    And tôi nhấn nút "Tìm kiếm"
    Then phải hiển thị thông báo lỗi "Vui lòng chọn ga đi"

  @sap-xep-gia-tang
  Scenario: Sắp xếp sản phẩm theo giá tăng dần
    Given tôi thấy danh sách kết quả tìm kiếm
    When tôi chọn "Giá: Thấp đến cao" trong dropdown sắp xếp
    Then danh sách phải được sắp xếp theo giá vé từ thấp nhất đến cao nhất
    And giá vé thấp nhất phải xuất hiện đầu tiên
    And sắp xếp phải được áp dụng ngay lập tức

  @sap-xep-gia-giam
  Scenario: Sắp xếp sản phẩm theo giá giảm dần
    Given tôi thấy danh sách kết quả tìm kiếm
    When tôi chọn "Giá: Cao đến thấp" trong dropdown sắp xếp
    Then danh sách phải được sắp xếp theo giá vé từ cao nhất đến thấp nhất
    And giá vé cao nhất phải xuất hiện đầu tiên

  @sap-xep-thoi-gian
  Scenario: Sắp xếp sản phẩm theo thời gian đi
    Given tôi thấy danh sách kết quả tìm kiếm
    When tôi chọn "Giờ đi: Sớm nhất" trong dropdown sắp xếp
    Then danh sách phải được sắp xếp theo giờ đi từ sớm nhất đến muộn nhất
    When tôi chọn "Giờ đi: Muộn nhất" trong dropdown sắp xếp
    Then danh sách phải được sắp xếp theo giờ đi từ muộn nhất đến sớm nhất

  @sap-xep-danh-gia
  Scenario: Sắp xếp sản phẩm theo đánh giá
    Given tôi thấy danh sách kết quả tìm kiếm
    When tôi chọn "Đánh giá: Cao nhất" trong dropdown sắp xếp
    Then sản phẩm có đánh giá cao nhất phải xuất hiện đầu tiên
    And các sản phẩm phải được sắp xếp theo số sao từ cao xuống thấp

  @loc-loai-toa
  Scenario: Lọc theo loại toa
    Given tôi ở trang tìm kiếm sản phẩm
    And tôi thấy các kết quả tìm kiếm
    When tôi chọn "Toa ngồi điều hòa" trong bộ lọc loại toa
    Then chỉ các chuyến tàu có toa ngồi điều hòa phải được hiển thị
    When tôi thêm "Toa giường nằm" vào bộ lọc
    Then cả toa ngồi điều hòa và toa giường nằm phải được hiển thị
    And số lượng kết quả phải được cập nhật

  @loc-khoang-gia
  Scenario: Lọc theo khoảng giá
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi kéo thanh trượt giá tối thiểu đến "300.000đ"
    And tôi kéo thanh trượt giá tối đa đến "1.000.000đ"
    Then chỉ các chuyến tàu có giá trong khoảng 300.000đ - 1.000.000đ phải được hiển thị
    And giá không hợp lệ phải bị loại bỏ
    And bộ lọc phải tự động áp dụng khi thay đổi

  @loc-gio-di
  Scenario: Lọc theo khoảng thời gian đi
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi chọn khung giờ "Sáng (6:00 - 12:00)"
    Then chỉ các chuyến tàu đi trong khoảng 6:00 - 12:00 phải được hiển thị
    When tôi thêm khung giờ "Chiều (12:00 - 18:00)"
    Then cả chuyến tàu đi buổi sáng và buổi chiều phải được hiển thị
    And các chuyến tàu đi đêm phải bị ẩn

  @loc-hang-tau
  Scenario: Lọc theo hãng tàu
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi chọn "Vật tư - Giao thông" trong bộ lọc hãng tàu
    Then chỉ các chuyến tàu của Vật tư - Giao thông phải được hiển thị
    When tôi chọn thêm "Sắt Thép Việt Nam"
    Then cả hai hãng tàu được chọn phải được hiển thị
    And các hãng tàu khác phải bị ẩn

  @loc-thoi gian-di
  Scenario: Lọc theo thời gian di chuyển
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi chọn "Dưới 6 giờ" trong bộ lọc thời gian di chuyển
    Then chỉ các chuyến tàu có thời gian di chuyển dưới 6 giờ phải được hiển thị
    When tôi thay đổi thành "6 - 12 giờ"
    Then chỉ các chuyến tàu có thời gian di chuyển từ 6-12 giờ phải được hiển thị
    When tôi chọn "Trên 12 giờ"
    Then chỉ các chuyến tàu có thời gian di chuyển trên 12 giờ phải được hiển thị

  @loc-ket-hop
  Scenario: Kết hợp nhiều bộ lọc
    Given tôi ở trang tìm kiếm sản phẩm
    When tôi tìm kiếm từ "Hà Nội" đến "Đà Nẵng"
    And tôi chọn loại toa "Giường nằm điều hòa"
    And tôi chọn khoảng giá "500.000đ - 800.000đ"
    And tôi chọn khung giờ "Tối (18:00 - 24:00)"
    Then hệ thống phải hiển thị các chuyến tàu thỏa mãn TẤT CẢ các điều kiện
    And số lượng bộ lọc đang áp dụng phải được hiển thị
    And phải có nút "Xóa tất cả bộ lọc"

  @hien-thi-bo-loc
  Scenario: Hiển thị và quản lý bộ lọc đang áp dụng
    Given tôi đã áp dụng nhiều bộ lọc
    Then tôi phải thấy danh sách các bộ lọc đang áp dụng
    And mỗi bộ lọc phải có nút "X" để xóa riêng lẻ
    When tôi nhấn nút "X" bên cạnh bộ lọc "Khoảng giá"
    Then bộ lọc giá phải được bỏ áp dụng
    And kết quả phải được cập nhật ngay lập tức
    When tôi nhấn "Xóa tất cả bộ lọc"
    Then tất cả bộ lọc phải được xóa
    Và kết quả phải quay về trạng thái tìm kiếm ban đầu

  @luu-bo-loc
  Scenario: Lưu bộ lọc tìm kiếm yêu thích
    Given tôi đã cấu hình các bộ lọc phức tạp
    When tôi nhấn nút "Lưu bộ lọc này"
    Then hệ thống phải yêu cầu tôi đặt tên cho bộ lọc
    When tôi nhập "Công tác Hà Nội - Đà Nẵng" và xác nhận
    Then bộ lọc phải được lưu vào tài khoản của tôi
    Và lần sau tôi có thể chọn bộ lọc này từ danh sách "Bộ lọc đã lưu"

  @responsive-tim-kiem
  Scenario: Responsive design cho trang tìm kiếm
    Given tôi truy cập trang tìm kiếm bằng thiết bị di động
    Then form tìm kiếm phải hiển thị dạng compact
    Và các bộ lọc phải nằm trong tab "Bộ lọc"
    When tôi nhấn tab "Bộ lọc"
    Then các bộ lọc phải hiển thị dạng modal từ dưới lên
    Và các control phải đủ lớn để thao tác bằng ngón tay

  @autocomplete-ga
  Scenario: Tự động hoàn thành khi nhập ga
    Given tôi đang ở ô tìm kiếm ga đi
    When tôi nhập "Ha No"
    Then hệ thống phải hiển thị danh sách gợi ý:
      """
      - Hà Nội
      - Hà Đông
      - Hà Giang
      """
    When tôi chọn "Hà Nội" từ danh sách gợi ý
    Then ô input phải được điền đầy đủ "Hà Nội"
    Và form phải sẵn sàng để tiếp tục tìm kiếm

  @lich-su-tim-kiem
  Scenario: Lưu lịch sử tìm kiếm
    Given tôi đã thực hiện các tìm kiếm trước đó
    When tôi nhấp vào ô tìm kiếm
    Then phải hiển thị danh sách các tìm kiếm gần đây
    When tôi chọn một tìm kiếm gần đây
    Then form phải được điền tự động với các giá trị đã lưu
    Và hệ thống phải hiển thị lại kết quả tương ứng

  @thong-ke-ket-qua
  Scenario: Hiển thị thống kê kết quả tìm kiếm
    Given hệ thống đã trả về kết quả tìm kiếm
    Then phải hiển thị thống kê:
      """
      - Tổng số chuyến tàu tìm thấy: X chuyến
      - Giá thấp nhất: Y đ
      - Giá cao nhất: Z đ
      - Thời gian đi sớm nhất: HH:MM
      - Thời gian đi muộn nhất: HH:MM
      """
    Và thống kê phải được cập nhật khi áp dụng bộ lọc