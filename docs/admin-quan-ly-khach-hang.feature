# language: vi
Tính năng: Quản lý Khách hàng (Admin)
  Là một quản trị viên hệ thống
  Tôi muốn quản lý thông tin khách hàng
  Để hỗ trợ khách hàng tốt hơn và quản lý dữ liệu hiệu quả

  Bối cảnh:
    Cho trước tôi đã đăng nhập với vai trò Admin
    Và tôi đang ở trang "Quản lý Khách hàng"

  Kịch bản: Xem danh sách khách hàng
    Khi tôi truy cập trang "Quản lý Khách hàng"
    Thì hệ thống hiển thị danh sách tất cả khách hàng
    Và mỗi khách hàng hiển thị các thông tin:
      | Trường thông tin      | Mô tả                                    |
      | Mã khách hàng         | Mã định danh duy nhất                    |
      | Họ và tên             | Tên đầy đủ của khách hàng                |
      | Email                 | Địa chỉ email                            |
      | Số điện thoại         | Số điện thoại liên hệ                    |
      | Ngày đăng ký          | Ngày tạo tài khoản                       |
      | Tổng đơn hàng         | Số lượng đơn hàng đã đặt                 |
      | Tổng chi tiêu         | Tổng giá trị đơn hàng                    |
      | Trạng thái tài khoản  | Hoạt động / Bị khóa / Chờ xác thực       |
    Và có các nút hành động "Xem", "Sửa", "Khóa/Mở khóa", "Lịch sử"

  Kịch bản: Tìm kiếm khách hàng
    Khi tôi nhập từ khóa "<từ_khóa>" vào ô tìm kiếm
    Thì hệ thống tìm kiếm trong các trường:
      | Trường tìm kiếm   |
      | Họ và tên         |
      | Email             |
      | Số điện thoại     |
      | Mã khách hàng     |
    Và hiển thị danh sách khách hàng phù hợp
    Và làm nổi bật từ khóa tìm kiếm trong kết quả

    Ví dụ:
      | từ_khóa           |
      | Nguyễn Văn A      |
      | user@example.com  |
      | 0901234567        |

  Kịch bản: Lọc khách hàng theo tiêu chí
    Khi tôi chọn bộ lọc:
      | Bộ lọc            | Giá trị           |
      | Trạng thái        | <trạng_thái>      |
      | Ngày đăng ký      | <khoảng_thời_gian>|
      | Tổng chi tiêu     | <khoảng_tiền>     |
    Và tôi nhấn nút "Áp dụng bộ lọc"
    Thì hệ thống hiển thị khách hàng phù hợp với tiêu chí
    Và hiển thị số lượng kết quả tìm thấy

    Ví dụ:
      | trạng_thái  | khoảng_thời_gian        | khoảng_tiền          |
      | Hoạt động   | 01/12/2025 - 31/12/2025 |                      |
      | Bị khóa     |                         |                      |
      | Hoạt động   | 01/11/2025 - 30/11/2025 | 5,000,000 - 10,000,000|

  Kịch bản: Xem chi tiết khách hàng
    Cho trước đã có khách hàng với mã "KH001"
    Khi tôi nhấn nút "Xem" của khách hàng "KH001"
    Thì hệ thống hiển thị trang chi tiết khách hàng với các tab:
      | Tab                   | Nội dung                                  |
      | Thông tin cá nhân     | Họ tên, email, SĐT, địa chỉ, CCCD        |
      | Lịch sử đơn hàng      | Danh sách tất cả đơn hàng đã đặt         |
      | Thống kê              | Tổng đơn, tổng chi tiêu, chuyến ưa thích |
      | Hoạt động             | Timeline các hoạt động của khách hàng    |
      | Ghi chú               | Các ghi chú của admin về khách hàng      |

  Kịch bản: Cập nhật thông tin khách hàng
    Cho trước đã có khách hàng "KH001"
    Khi tôi nhấn nút "Sửa" của khách hàng "KH001"
    Thì hệ thống hiển thị form chỉnh sửa với thông tin hiện tại
    Khi tôi thay đổi:
      | Trường          | Giá trị mới           |
      | Số điện thoại   | 0987654321            |
      | Địa chỉ         | 123 Nguyễn Huệ, Q1    |
    Và tôi nhấn nút "Cập nhật"
    Thì hệ thống lưu thông tin đã thay đổi
    Và hiển thị thông báo "Cập nhật thông tin khách hàng thành công"
    Và ghi log hành động "Admin đã cập nhật thông tin khách hàng KH001"
    Và gửi email thông báo cho khách hàng về việc cập nhật thông tin

  Kịch bản: Xem lịch sử đơn hàng của khách hàng
    Cho trước khách hàng "KH001" đã có 5 đơn hàng
    Khi tôi xem chi tiết khách hàng "KH001"
    Và tôi chọn tab "Lịch sử đơn hàng"
    Thì hệ thống hiển thị danh sách 5 đơn hàng
    Và mỗi đơn hàng hiển thị:
      | Thông tin đơn hàng    |
      | Mã đơn hàng           |
      | Chuyến tàu            |
      | Ngày đặt              |
      | Tổng tiền             |
      | Trạng thái            |
    Và có nút "Xem chi tiết" cho mỗi đơn hàng

  Kịch bản: Xóa khách hàng
    Cho trước đã có khách hàng "KH001" chưa có đơn hàng nào
    Khi tôi nhấn menu "Hành động khác" của khách hàng "KH001"
    Và tôi chọn "Xóa khách hàng"
    Thì hệ thống hiển thị cảnh báo "Bạn có chắc chắn muốn xóa khách hàng này?"
    Khi tôi nhấn "Xác nhận xóa"
    Thì hệ thống xóa khách hàng khỏi cơ sở dữ liệu
    Và hiển thị thông báo "Xóa khách hàng thành công"
    Và ghi log hành động

  Kịch bản: Không cho phép xóa khách hàng đã có đơn hàng
    Cho trước đã có khách hàng "KH001" có ít nhất 1 đơn hàng
    Khi tôi cố gắng xóa khách hàng "KH001"
    Thì hệ thống hiển thị lỗi "Không thể xóa khách hàng đã có đơn hàng"
    Và khách hàng vẫn còn trong hệ thống
