# language: vi
Tính năng: Quản lý Đơn hàng (Admin)
  Là một quản trị viên hệ thống
  Tôi muốn quản lý các đơn hàng đặt vé tàu
  Để theo dõi, xử lý và hỗ trợ khách hàng hiệu quả

  Bối cảnh:
    Cho trước tôi đã đăng nhập với vai trò Admin
    Và tôi đang ở trang "Quản lý Đơn hàng"

  Kịch bản: Xem danh sách đơn hàng
    Khi tôi truy cập trang "Quản lý Đơn hàng"
    Thì hệ thống hiển thị danh sách tất cả đơn hàng
    Và mỗi đơn hàng hiển thị các thông tin:
      | Trường thông tin      | Mô tả                                    |
      | Mã đơn hàng           | Mã định danh duy nhất                    |
      | Khách hàng            | Họ tên và email khách hàng               |
      | Chuyến tàu            | Mã và tên chuyến tàu                     |
      | Ngày khởi hành        | Thời gian khởi hành của chuyến tàu       |
      | Số lượng vé           | Tổng số vé trong đơn hàng                |
      | Tổng tiền             | Tổng giá trị đơn hàng                    |
      | Ngày đặt              | Thời gian tạo đơn hàng                   |
      | Trạng thái thanh toán | Chưa thanh toán / Đã thanh toán / Hoàn tiền|
      | Trạng thái đơn hàng   | Chờ xử lý / Đã xác nhận / Hoàn thành / Đã hủy|

  Kịch bản: Lọc đơn hàng theo tiêu chí
    Khi tôi chọn bộ lọc:
      | Bộ lọc                | Giá trị               |
      | Trạng thái đơn hàng   | <trạng_thái_đơn>      |
      | Trạng thái thanh toán | <trạng_thái_tt>       |
      | Ngày đặt              | <khoảng_thời_gian>    |
    Và tôi nhấn "Áp dụng bộ lọc"
    Thì hệ thống hiển thị các đơn hàng phù hợp

  Kịch bản: Xác nhận đơn hàng
    Cho trước đã có đơn hàng "DH2025001" với trạng thái "Chờ xử lý"
    Và trạng thái thanh toán là "Đã thanh toán"
    Khi tôi xem chi tiết đơn hàng "DH2025001"
    Và tôi nhấn nút "Xác nhận đơn"
    Thì hệ thống cập nhật trạng thái đơn hàng thành "Đã xác nhận"
    Và gửi email xác nhận đơn hàng kèm vé cho khách hàng
    Và ghi log hành động "Admin đã xác nhận đơn hàng DH2025001"

  Kịch bản: Hủy đơn hàng
    Cho trước đã có đơn hàng "DH2025001"
    Khi tôi nhấn nút "Hủy đơn"
    Và tôi nhập lý do "Khách hàng yêu cầu hủy"
    Và tôi nhấn "Xác nhận hủy"
    Thì hệ thống cập nhật trạng thái đơn hàng thành "Đã hủy"
    Và hoàn lại ghế đã đặt cho chuyến tàu
    Và gửi email thông báo hủy đơn cho khách hàng

  Kịch bản: In vé điện tử
    Cho trước đã có đơn hàng "DH2025001" với trạng thái "Đã xác nhận"
    Khi tôi nhấn nút "In vé"
    Thì hệ thống tạo file PDF chứa thông tin vé
    Và tải xuống file PDF
