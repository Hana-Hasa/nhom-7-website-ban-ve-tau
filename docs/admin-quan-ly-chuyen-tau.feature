# language: vi
Tính năng: Quản lý Chuyến tàu (Admin)
  Là một quản trị viên hệ thống
  Tôi muốn quản lý thông tin các chuyến tàu
  Để đảm bảo dữ liệu chuyến tàu luôn chính xác và cập nhật

  Bối cảnh:
    Cho trước tôi đã đăng nhập với vai trò Admin
    Và tôi đang ở trang "Quản lý Chuyến tàu"

  Kịch bản: Xem danh sách chuyến tàu
    Khi tôi truy cập trang "Quản lý Chuyến tàu"
    Thì hệ thống hiển thị danh sách tất cả các chuyến tàu
    Và mỗi chuyến tàu hiển thị các thông tin:
      | Trường thông tin          | Mô tả                                    |
      | Mã chuyến tàu             | Mã định danh duy nhất của chuyến tàu     |
      | Tên chuyến tàu            | Tên hiển thị của chuyến tàu              |
      | Tuyến đường               | Ga đi - Ga đến                           |
      | Thời gian khởi hành       | Ngày giờ khởi hành                       |
      | Thời gian đến             | Ngày giờ đến dự kiến                     |
      | Số ghế khả dụng           | Tổng số ghế / Số ghế còn trống           |
      | Giá vé                    | Khoảng giá từ thấp đến cao               |
      | Trạng thái                | Hoạt động / Tạm dừng / Đã hủy            |
    Và có các nút hành động "Sửa", "Xóa", "Chi tiết"

  Kịch bản: Tìm kiếm và lọc chuyến tàu
    Khi tôi nhập từ khóa "<từ_khóa>" vào ô tìm kiếm
    Và tôi chọn bộ lọc:
      | Bộ lọc        | Giá trị        |
      | Tuyến đường   | <tuyến_đường>  |
      | Trạng thái    | <trạng_thái>   |
      | Ngày khởi hành| <ngày>         |
    Và tôi nhấn nút "Tìm kiếm"
    Thì hệ thống hiển thị danh sách chuyến tàu phù hợp với tiêu chí
    Và số lượng kết quả được hiển thị

    Ví dụ:
      | từ_khóa | tuyến_đường       | trạng_thái | ngày       |
      | SE1     |                   | Hoạt động  |            |
      |         | Hà Nội - Sài Gòn  | Hoạt động  | 2025-12-25 |
      | SE      | Hà Nội - Đà Nẵng  |            |            |

  Kịch bản: Thêm mới chuyến tàu
    Khi tôi nhấn nút "Thêm chuyến tàu mới"
    Thì hệ thống hiển thị form nhập thông tin chuyến tàu
    Khi tôi điền đầy đủ thông tin:
      | Trường                    | Giá trị                     |
      | Mã chuyến tàu             | SE101                       |
      | Tên chuyến tàu            | Thống Nhất SE101            |
      | Ga đi                     | Hà Nội                      |
      | Ga đến                    | TP. Hồ Chí Minh             |
      | Thời gian khởi hành       | 2025-12-25 19:30            |
      | Thời gian đến             | 2025-12-26 08:30            |
      | Loại tàu                  | Ghế ngồi mềm điều hòa       |
      | Tổng số ghế               | 200                         |
      | Giá vé cơ bản             | 800,000 VND                 |
      | Trạng thái                | Hoạt động                   |
    Và tôi nhấn nút "Lưu"
    Thì hệ thống lưu thông tin chuyến tàu mới
    Và hiển thị thông báo "Thêm chuyến tàu thành công"
    Và chuyến tàu mới xuất hiện trong danh sách
    Và ghi log hành động "Admin đã thêm chuyến tàu SE101"

  Kịch bản: Thêm chuyến tàu với thông tin không hợp lệ
    Khi tôi nhấn nút "Thêm chuyến tàu mới"
    Và tôi để trống trường "<trường_bắt_buộc>"
    Và tôi nhấn nút "Lưu"
    Thì hệ thống hiển thị lỗi "Vui lòng điền đầy đủ thông tin bắt buộc"
    Và chuyến tàu không được lưu

    Ví dụ:
      | trường_bắt_buộc       |
      | Mã chuyến tàu         |
      | Tên chuyến tàu        |
      | Ga đi                 |
      | Ga đến                |
      | Thời gian khởi hành   |

  Kịch bản: Thêm chuyến tàu với mã trùng lặp
    Cho trước đã có chuyến tàu với mã "SE101"
    Khi tôi nhấn nút "Thêm chuyến tàu mới"
    Và tôi nhập mã chuyến tàu "SE101"
    Và tôi điền đầy đủ thông tin khác
    Và tôi nhấn nút "Lưu"
    Thì hệ thống hiển thị lỗi "Mã chuyến tàu đã tồn tại"
    Và chuyến tàu không được lưu

  Kịch bản: Cập nhật thông tin chuyến tàu
    Cho trước đã có chuyến tàu với mã "SE101"
    Khi tôi nhấn nút "Sửa" của chuyến tàu "SE101"
    Thì hệ thống hiển thị form chỉnh sửa với thông tin hiện tại
    Khi tôi thay đổi:
      | Trường              | Giá trị mới     |
      | Giá vé cơ bản       | 850,000 VND     |
      | Trạng thái          | Tạm dừng        |
    Và tôi nhấn nút "Cập nhật"
    Thì hệ thống lưu thông tin đã thay đổi
    Và hiển thị thông báo "Cập nhật chuyến tàu thành công"
    Và thông tin mới được hiển thị trong danh sách
    Và ghi log hành động "Admin đã cập nhật chuyến tàu SE101"

  Kịch bản: Xóa chuyến tàu
    Cho trước đã có chuyến tàu "SE101" chưa có đơn hàng nào
    Khi tôi nhấn nút "Xóa" của chuyến tàu "SE101"
    Thì hệ thống hiển thị hộp thoại xác nhận "Bạn có chắc chắn muốn xóa chuyến tàu SE101?"
    Khi tôi nhấn nút "Xác nhận xóa"
    Thì hệ thống xóa chuyến tàu khỏi cơ sở dữ liệu
    Và hiển thị thông báo "Xóa chuyến tàu thành công"
    Và chuyến tàu không còn xuất hiện trong danh sách
    Và ghi log hành động "Admin đã xóa chuyến tàu SE101"

  Kịch bản: Không cho phép xóa chuyến tàu đã có đơn hàng
    Cho trước đã có chuyến tàu "SE101" có ít nhất 1 đơn hàng
    Khi tôi nhấn nút "Xóa" của chuyến tàu "SE101"
    Thì hệ thống hiển thị thông báo lỗi "Không thể xóa chuyến tàu đã có đơn hàng"
    Và chuyến tàu vẫn còn trong danh sách

  Kịch bản: Xem chi tiết chuyến tàu
    Cho trước đã có chuyến tàu "SE101"
    Khi tôi nhấn nút "Chi tiết" của chuyến tàu "SE101"
    Thì hệ thống hiển thị trang chi tiết chuyến tàu với các thông tin:
      | Nhóm thông tin          | Nội dung                                  |
      | Thông tin cơ bản        | Mã, tên, tuyến đường, thời gian           |
      | Thông tin toa tàu       | Danh sách các toa tàu và loại ghế         |
      | Thông tin giá vé        | Bảng giá theo loại ghế                    |
      | Thống kê                | Tổng đơn hàng, doanh thu, tỷ lệ lấp đầy   |
      | Lịch sử thay đổi        | Các lần cập nhật thông tin                |

  Kịch bản: Quản lý toa tàu và ghế ngồi
    Cho trước tôi đang xem chi tiết chuyến tàu "SE101"
    Khi tôi nhấn tab "Quản lý toa tàu"
    Thì hệ thống hiển thị danh sách các toa tàu
    Khi tôi nhấn "Thêm toa tàu"
    Và tôi điền thông tin:
      | Trường          | Giá trị               |
      | Số toa          | 5                     |
      | Loại toa        | Ghế ngồi mềm          |
      | Số ghế          | 64                    |
      | Sơ đồ ghế       | 4x16 (4 ghế x 16 hàng)|
    Và tôi nhấn "Lưu"
    Thì hệ thống tạo toa tàu mới với sơ đồ ghế tương ứng
    Và hiển thị thông báo "Thêm toa tàu thành công"

  Kịch bản: Vô hiệu hóa ghế ngồi cụ thể
    Cho trước chuyến tàu "SE101" có toa tàu số 5
    Khi tôi chọn toa tàu số 5
    Và tôi chọn ghế "5A"
    Và tôi nhấn nút "Vô hiệu hóa ghế"
    Và tôi nhập lý do "Ghế hỏng, cần bảo trì"
    Và tôi nhấn "Xác nhận"
    Thì hệ thống đánh dấu ghế "5A" là không khả dụng
    Và ghế không hiển thị khi khách hàng chọn ghế
    Và ghi log hành động với lý do

