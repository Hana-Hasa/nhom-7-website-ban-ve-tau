# Language: vi
@ho-tro-lien-he
Feature: Hỗ trợ và Liên hệ
  Là một người dùng truy cập website
  Tôi muốn xem thông tin liên hệ và hỗ trợ
  Để có thể liên lạc với công ty khi cần thiết

  Background:
    Given tôi đang ở bất kỳ trang nào trên website
    When tôi cuộn xuống cuối trang (footer)
    And tôi nhấn vào liên kết "Liên hệ" trong footer
    Then tôi được chuyển đến trang "Liên hệ & Hỗ trợ"

  @hien-thi-thong-tin-lien-he
  Scenario: Hiển thị thông tin liên hệ cơ bản
    Given tôi đang ở trang liên hệ
    Then tôi thấy tiêu đề trang "Liên hệ & Hỗ trợ"
    And tôi thấy các khối thông tin sau được hiển thị rõ ràng:
      | Loại thông tin    | Nội dung hiển thị                              |
      | Địa chỉ văn phòng | Icon địa điểm + Địa chỉ đầy đủ văn phòng chính |
      | Hotline           | Icon điện thoại + Số hotline 24/7              |
      | Email             | Icon email + Địa chỉ email chính thức          |


  @kenh-lien-lac
  Scenario: Hiển thị các kênh liên lạc
    Given tôi đang ở trang liên hệ
    Then tôi thấy phần "Kết nối với chúng tôi" với các kênh:
      | Kênh      | Hiển thị                                    |
      | Facebook  | Icon Facebook + Link trang chính thức       |
      | Zalo      | Icon Zalo + Số điện thoại Zalo              |
      | Email     | Icon Email + Địa chỉ email                  |
      | Hotline   | Icon Phone + Số hotline                     |
    And mỗi kênh có button/link để truy cập trực tiếp

  @cau-hoi-thuong-gap
  Scenario: Hiển thị câu hỏi thường gặp (FAQ)
    Given tôi đang ở trang liên hệ
    When tôi cuộn xuống phần "Câu hỏi thường gặp"
    Then tôi thấy danh sách ít nhất 6 câu hỏi
    And mỗi câu hỏi có dạng accordion (có thể mở/đóng)
    And mặc định tất cả câu hỏi đều đóng

  @mo-dong-faq
  Scenario: Mở/đóng câu hỏi FAQ
    Given tôi đang ở phần FAQ
    When tôi click vào một câu hỏi bất kỳ
    Then câu hỏi đó mở ra hiển thị câu trả lời
    And có animation mượt mà khi mở/đóng
    When tôi click lại vào câu hỏi đó
    Then câu trả lời được thu gọn


  @responsive-mobile-lien-he
  Scenario: Giao diện Liên hệ trên Mobile
    Given tôi sử dụng thiết bị di động
    When tôi truy cập trang liên hệ
    Then tất cả các khối thông tin hiển thị theo dạng dọc (1 cột)
    And các icon và text có kích thước dễ đọc
    And khoảng cách giữa các phần tử đủ rộng để dễ chạm

  @click-to-call-mobile
  Scenario: Click để gọi điện trên Mobile
    Given tôi đang dùng thiết bị di động
    And tôi đang ở trang liên hệ
    When tôi click vào số hotline
    Then ứng dụng điện thoại mở ra với số đã được điền sẵn
    And tôi có thể gọi trực tiếp

  @click-to-email-mobile
  Scenario: Click để gửi email trên Mobile
    Given tôi đang dùng thiết bị di động
    And tôi đang ở trang liên hệ
    When tôi click vào địa chỉ email
    Then ứng dụng email mặc định mở ra
    And địa chỉ email đã được điền sẵn trong trường "To"



  @layout-sections
  Scenario: Bố cục các phần trên trang
    Given tôi đang ở trang liên hệ
    Then tôi thấy các phần được sắp xếp theo thứ tự:
      1. Hero section với tiêu đề
      2. Thông tin liên hệ (địa chỉ, hotline, email)
      3. Các kênh kết nối (Facebook, Zalo, etc.)
      4. Câu hỏi thường gặp (FAQ)
    And mỗi phần có tiêu đề rõ ràng
