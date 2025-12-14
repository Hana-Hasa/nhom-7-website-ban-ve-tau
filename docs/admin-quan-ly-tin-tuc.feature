# language: vi
Tính năng: Quản lý Tin tức (Admin)
  Là một quản trị viên hệ thống
  Tôi muốn quản lý các bài viết tin tức
  Để cung cấp thông tin hữu ích cho khách hàng

  Bối cảnh:
    Cho trước tôi đã đăng nhập với vai trò Admin
    Và tôi đang ở trang "Quản lý Tin tức"

  Kịch bản: Xem danh sách tin tức
    Khi tôi truy cập trang "Quản lý Tin tức"
    Thì hệ thống hiển thị danh sách tất cả bài viết
    Và mỗi bài viết hiển thị:
      | Trường thông tin  | Mô tả                                    |
      | Tiêu đề           | Tiêu đề bài viết                         |
      | Danh mục          | Danh mục tin tức                         |
      | Tác giả           | Người tạo bài viết                       |
      | Ngày đăng         | Ngày xuất bản                            |
      | Lượt xem          | Số lượt xem bài viết                     |
      | Trạng thái        | Nháp / Đã xuất bản / Ẩn                  |
    Và có các nút "Sửa", "Xóa", "Xem trước"

  Kịch bản: Tìm kiếm tin tức
    Khi tôi nhập từ khóa "<từ_khóa>" vào ô tìm kiếm
    Thì hệ thống hiển thị kết quả phù hợp

  Kịch bản: Thêm bài viết mới
    Khi tôi nhấn "Thêm bài viết mới"
    Và tôi điền thông tin:
      | Trường        | Giá trị                           |
      | Tiêu đề       | Hướng dẫn đặt vé tàu trực tuyến   |
      | Danh mục      | Hướng dẫn                         |
      | Nội dung      | Nội dung chi tiết bài viết        |
      | Ảnh đại diện  | image.jpg                         |
      | Tags          | đặt vé, hướng dẫn                 |
      | Trạng thái    | Đã xuất bản                       |
    Và tôi nhấn "Lưu"
    Thì hệ thống lưu bài viết mới
    Và hiển thị thông báo "Thêm bài viết thành công"
    
  Kịch bản: Cập nhật bài viết
    Cho trước đã có bài viết với mã "BV001"
    Khi tôi nhấn "Sửa" bài viết "BV001"
    Và tôi thay đổi tiêu đề thành "Tiêu đề mới"
    Và tôi nhấn "Cập nhật"
    Thì hệ thống lưu thay đổi
    Và hiển thị thông báo "Cập nhật bài viết thành công"

  Kịch bản: Xóa bài viết
    Cho trước đã có bài viết "BV001"
    Khi tôi nhấn "Xóa" bài viết "BV001"
    Và tôi xác nhận xóa
    Thì hệ thống xóa bài viết
    Và hiển thị thông báo "Xóa bài viết thành công"

  Kịch bản: Quản lý danh mục
    Khi tôi nhấn "Quản lý danh mục"
    Và tôi nhấn "Thêm danh mục"
    Và tôi nhập tên "Khuyến mãi"
    Và tôi nhấn "Lưu"
    Thì hệ thống tạo danh mục mới
    
  Kịch bản: Xuất bản/Ẩn bài viết
    Cho trước bài viết "BV001" đang ở trạng thái "Nháp"
    Khi tôi chọn "Xuất bản"
    Thì hệ thống cập nhật trạng thái thành "Đã xuất bản"
    Và bài viết hiển thị trên website
