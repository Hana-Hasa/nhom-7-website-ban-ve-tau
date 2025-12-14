// Mock data for news articles
export interface NewsArticle {
    id: number;
    title: string;
    summary: string;
    content: string;
    image: string;
    date: string;
    category: string;
    author: string;
}

const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: "Ra mắt tuyến tàu cao tốc Hà Nội - Hải Phòng: Thời gian di chuyển chỉ còn 45 phút",
        summary: "Đường sắt Việt Nam chính thức vận hành tuyến tàu cao tốc hiện đại, rút ngắn thời gian di chuyển từ 2.5 giờ xuống còn 45 phút.",
        content: `<h2>Bước tiến mới của ngành đường sắt Việt Nam</h2>
    <p>Sáng nay, tại ga Hà Nội, Tổng công ty Đường sắt Việt Nam đã chính thức ra mắt tuyến tàu cao tốc Hà Nội - Hải Phòng. Đây là dự án trọng điểm được đầu tư gần 5 tỷ USD, đánh dấu bước tiến quan trọng trong việc hiện đại hóa hạ tầng giao thông của đất nước.</p>
    
    <p>Tuyến tàu cao tốc mới không chỉ rút ngắn thời gian di chuyển từ 2.5 giờ xuống còn 45 phút mà còn mang đến trải nghiệm hoàn toàn mới cho hành khách với các tiện nghi hiện đại như WiFi miễn phí, ghế ngồi êm ái, và dịch vụ ăn uống cao cấp.</p>
    
    <h3>Lợi ích kinh tế - xã hội</h3>
    <p>Chuyên gia kinh tế cho rằng tuyến tàu cao tốc này sẽ thúc đẩy mạnh mẽ sự phát triển kinh tế của vùng đồng bằng Bắc Bộ, tạo điều kiện thuận lợi cho việc luân chuyển hàng hóa và lao động giữa hai thành phố lớn.</p>`,
        image: "/tau-moi-2025.jpg",
        date: "2025-12-10",
        category: "Tin tức",
        author: "Nguyễn Văn An"
    },
    {
        id: 2,
        title: "Khuyến mãi đặc biệt mùa lễ hội: Giảm đến 40% cho các tuyến tàu du lịch",
        summary: "Nhân dịp Tết Nguyên đán, Vé Tàu Việt tung chương trình khuyến mãi lớn với mức giảm giá hấp dẫn cho tất cả các tuyến tàu du lịch.",
        content: `<h2>Chương trình khuyến mãi lớn nhất trong năm</h2>
    <p>Từ ngày 15/12/2025 đến 31/01/2026, Vé Tàu Việt triển khai chương trình khuyến mãi "Tết Sum Vầy - Ưu Đãi Tràn Đầy" với mức giảm giá lên đến 40% cho các tuyến tàu du lịch hot nhất.</p>
    
    <h3>Các tuyến được ưu đãi</h3>
    <ul>
      <li>Hà Nội - Sapa: Giảm 40%</li>
      <li>TP.HCM - Nha Trang: Giảm 35%</li>
      <li>Hà Nội - Đà Nẵng: Giảm 30%</li>
      <li>TP.HCM - Phan Thiết: Giảm 25%</li>
    </ul>
    
    <p>Đặc biệt, khách hàng đặt vé sớm trước 30 ngày sẽ được tặng thêm voucher ăn uống trị giá 100.000đ và ưu tiên chọn chỗ ngồi.</p>`,
        image: "/khuyen-mai-ve-tau.jpg",
        date: "2025-12-08",
        category: "Khuyến mãi",
        author: "Trần Thị Bình"
    },
    {
        id: 3,
        title: "Hướng dẫn đặt vé tàu online nhanh chóng và tiện lợi cho người mới",
        summary: "Bài viết chi tiết từng bước để đặt vé tàu trực tuyến, giúp bạn tiết kiệm thời gian và tránh phải xếp hàng tại ga.",
        content: `<h2>Đặt vé tàu online chỉ với 5 bước đơn giản</h2>
    <p>Việc đặt vé tàu trực tuyến ngày nay đã trở nên vô cùng đơn giản. Dưới đây là hướng dẫn chi tiết từng bước:</p>
    
    <h3>Bước 1: Truy cập website</h3>
    <p>Vào trang chủ Vé Tàu Việt tại địa chỉ vetauviet.vn</p>
    
    <h3>Bước 2: Chọn tuyến đường và ngày đi</h3>
    <p>Nhập điểm đi, điểm đến và ngày khởi hành mong muốn vào form tìm kiếm.</p>
    
    <h3>Bước 3: Chọn chỗ ngồi</h3>
    <p>Xem sơ đồ toa tàu và chọn chỗ ngồi phù hợp với nhu cầu của bạn.</p>
    
    <h3>Bước 4: Điền thông tin hành khách</h3>
    <p>Nhập đầy đủ thông tin cá nhân và liên hệ để nhận vé điện tử.</p>
    
    <h3>Bước 5: Thanh toán</h3>
    <p>Chọn phương thức thanh toán phù hợp và hoàn tất giao dịch.</p>`,
        image: "/duong-sat-thong-minh.jpg",
        date: "2025-12-05",
        category: "Hướng dẫn",
        author: "Lê Minh Châu"
    },
    {
        id: 4,
        title: "Top 5 tuyến tàu đẹp nhất Việt Nam khiến du khách mê mẩn",
        summary: "Khám phá những cung đường sắt đẹp nhất đất nước, nơi bạn có thể ngắm nhìn phong cảnh thiên nhiên tuyệt đẹp từ cửa sổ toa tàu.",
        content: `<h2>Những cung đường sắt đẹp nhất Việt Nam</h2>
    <p>Việt Nam sở hữu nhiều tuyến đường sắt chạy qua những cảnh quan thiên nhiên tuyệt đẹp. Dưới đây là top 5 tuyến tàu được yêu thích nhất:</p>
    
    <h3>1. Đà Nẵng - Huế</h3>
    <p>Tuyến tàu chạy dọc theo bờ biển với đèo Hải Vân hùng vĩ.</p>
    
    <h3>2. Hà Nội - Lào Cai</h3>
    <p>Ngắm nhìn ruộng bậc thang và núi non trùng điệp của miền Tây Bắc.</p>
    
    <h3>3. Nha Trang - Tuy Hòa</h3>
    <p>Chạy dọc bờ biển xanh ngắt với những làng chài thơ mộng.</p>
    
    <h3>4. TP.HCM - Phan Thiết</h3>
    <p>Cung đường ven biển với những đồi cát trắng đặc trưng.</p>
    
    <h3>5. Vinh - Đông Hà</h3>
    <p>Xuyên qua vùng đất lịch sử với thiên nhiên kỳ vĩ.</p>`,
        image: "/ve-tham-quan.jpg",
        date: "2025-12-03",
        category: "Du lịch",
        author: "Phạm Hoàng Dũng"
    },
    {
        id: 5,
        title: "Nâng cấp hệ thống đặt vé online: Tích hợp AI giúp tư vấn tuyến đường tối ưu",
        summary: "Hệ thống mới sử dụng trí tuệ nhân tạo để đề xuất tuyến đường, thời gian và loại vé phù hợp nhất với nhu cầu của từng khách hàng.",
        content: `<h2>Công nghệ AI thay đổi trải nghiệm đặt vé</h2>
    <p>Vé Tàu Việt vừa ra mắt tính năng đặt vé thông minh sử dụng công nghệ AI, giúp khách hàng tìm được lựa chọn tối ưu nhất dựa trên nhiều yếu tố.</p>
    
    <h3>Tính năng nổi bật</h3>
    <ul>
      <li>Đề xuất tuyến đường tối ưu dựa trên thời gian và giá cả</li>
      <li>Dự đoán mức độ đông đúc của các chuyến tàu</li>
      <li>Gợi ý chỗ ngồi dựa trên sở thích cá nhân</li>
      <li>Cảnh báo về thời tiết và giao thông</li>
    </ul>
    
    <p>Hệ thống đã được thử nghiệm và cho kết quả tích cực với độ chính xác lên đến 95%.</p>`,
        image: "/tau-noi-that.jpg",
        date: "2025-12-01",
        category: "Công nghệ",
        author: "Võ Thị Trang"
    },
    {
        id: 6,
        title: "Chính sách hoàn hủy vé linh hoạt - Quyền lợi tối đa cho hành khách",
        summary: "Cập nhật chính sách mới cho phép khách hàng hủy và đổi vé dễ dàng hơn với mức phí hợp lý.",
        content: `<h2>Chính sách hoàn hủy vé mới</h2>
    <p>Từ tháng 12/2025, Vé Tàu Việt áp dụng chính sách hoàn hủy vé linh hoạt hơn nhằm đảm bảo quyền lợi tối đa cho khách hàng.</p>
    
    <h3>Chi tiết chính sách</h3>
    <ul>
      <li>Hủy vé trước 7 ngày: Hoàn 90% giá trị vé</li>
      <li>Hủy vé trước 3 ngày: Hoàn 70% giá trị vé</li>
      <li>Hủy vé trước 24 giờ: Hoàn 50% giá trị vé</li>
      <li>Đổi vé miễn phí nếu còn chỗ trống</li>
    </ul>
    
    <p>Quy trình hoàn tiền được thực hiện trong vòng 3-5 ngày làm việc.</p>`,
        image: "/ve-tau-viet.jpg",
        date: "2025-11-28",
        category: "Chính sách",
        author: "Đỗ Văn Bình"
    },
    {
        id: 7,
        title: "Ga Sài Gòn được cải tạo, hiện đại hóa với mức đầu tư 500 tỷ đồng",
        summary: "Dự án cải tạo ga Sài Gòn hứa hẹn mang đến không gian hiện đại, tiện nghi phục vụ hàng triệu lượt khách mỗi năm.",
        content: `<h2>Dự án cải tạo quy mô lớn</h2>
    <p>Ga Sài Gòn, một trong những ga lớn nhất cả nước, đang được cải tạo toàn diện với tổng mức đầu tư lên đến 500 tỷ đồng.</p>
    
    <h3>Các hạng mục chính</h3>
    <ul>
      <li>Mở rộng sảnh chờ lên 3000m²</li>
      <li>Lắp đặt hệ thống điều hòa trung tâm</li>
      <li>Xây dựng khu vực thương mại dịch vụ</li>
      <li>Hiện đại hóa hệ thống an ninh</li>
      <li>Cải thiện bãi đỗ xe và khu vực đón trả khách</li>
    </ul>
    
    <p>Dự kiến hoàn thành vào quý 2/2026.</p>`,
        image: "/tau-se1.jpg",
        date: "2025-11-25",
        category: "Tin tức",
        author: "Nguyễn Thị Mai"
    },
    {
        id: 8,
        title: "Tết Nguyên đán 2026: Tàu hỏa vẫn là lựa chọn hàng đầu của người dân",
        summary: "Số liệu thống kê cho thấy nhu cầu đặt vé tàu dịp Tết tăng 45% so với cùng kỳ năm ngoái.",
        content: `<h2>Nhu cầu vé tàu Tết tăng mạnh</h2>
    <p>Theo thống kê từ Tổng công ty Đường sắt Việt Nam, số lượng vé tàu đã đặt cho dịp Tết Nguyên đán 2026 đã tăng 45% so với cùng kỳ năm ngoái.</p>
    
    <h3>Các tuyến hot nhất</h3>
    <ul>
      <li>TP.HCM - Nha Trang: 85% vé đã được đặt</li>
      <li>Hà Nội - Vinh: 78% vé đã được đặt</li>
      <li>Hà Nội - TP.HCM: 92% vé đã được đặt</li>
    </ul>
    
    <p>Ngành đường sắt đã bố trí thêm 50 đoàn tàu để đáp ứng nhu cầu cao điểm.</p>`,
        image: "/ve-tet-2025.jpg",
        date: "2025-11-22",
        category: "Tin tức",
        author: "Trần Văn Công"
    },
    {
        id: 9,
        title: "Trải nghiệm hạng thương gia trên tàu SE1 - Xa hoa như bay hạng nhất",
        summary: "Toa tàu thương gia mới trên tuyến Hà Nội - TP.HCM mang đến trải nghiệm 5 sao với giá cả hợp lý.",
        content: `<h2>Tiêu chuẩn 5 sao trên đường ray</h2>
    <p>Toa tàu thương gia mới được đưa vào vận hành trên tuyến SE1 đã thu hút sự quan tâm lớn từ khách hàng cao cấp.</p>
    
    <h3>Tiện nghi đẳng cấp</h3>
    <ul>
      <li>Ghế massage thư giãn</li>
      <li>Màn hình giải trí cá nhân</li>
      <li>Suất ăn do đầu bếp 5 sao chuẩn bị</li>
      <li>Phòng tắm riêng biệt</li>
      <li>Dịch vụ butler 24/7</li>
    </ul>
    
    <p>Giá vé chỉ từ 3.5 triệu đồng cho hành trình 30 tiếng.</p>`,
        image: "/le-hoi-tren-tau.jpg",
        date: "2025-11-20",
        category: "Dịch vụ",
        author: "Lê Thị Hương"
    },
    {
        id: 10,
        title: "An ninh ga tàu được tăng cường dịp cuối năm bằng công nghệ nhận diện khuôn mặt",
        summary: "Hệ thống camera AI và nhận diện khuôn mặt được triển khai tại các ga lớn nhằm đảm bảo an toàn cho hành khách.",
        content: `<h2>Công nghệ bảo mật hiện đại</h2>
    <p>Các ga tàu lớn tại Hà Nội, TP.HCM và Đà Nẵng đã lắp đặt hệ thống camera AI với công nghệ nhận diện khuôn mặt.</p>
    
    <h3>Lợi ích của hệ thống</h3>
    <ul>
      <li>Phát hiện tự động các đối tượng khả nghi</li>
      <li>Cảnh báo sớm các tình huống bất thường</li>
      <li>Hỗ trợ tìm kiếm trẻ em bị lạc</li>
      <li>Lưu trữ dữ liệu an ninh dài hạn</li>
    </ul>
    
    <p>Hệ thống hoạt động 24/7 và được giám sát bởi đội ngũ chuyên nghiệp.</p>`,
        image: "/tau-se3.jpg",
        date: "2025-11-18",
        category: "An ninh",
        author: "Phạm Minh Tuấn"
    },
    {
        id: 11,
        title: "Chương trình tri ân khách hàng thân thiết với nhiều ưu đãi hấp dẫn",
        summary: "Vé Tàu Việt ra mắt chương trình tích điểm mới dành cho khách hàng thường xuyên với quà tặng giá trị.",
        content: `<h2>Chương trình khách hàng thân thiết</h2>
    <p>Từ tháng 12/2025, Vé Tàu Việt chính thức triển khai chương trình khách hàng thân thiết với nhiều quyền lợi đặc biệt.</p>
    
    <h3>Cấp độ thành viên</h3>
    <ul>
      <li>Bạc: Tích lũy từ 1 triệu đồng - Giảm 5%</li>
      <li>Vàng: Tích lũy từ 5 triệu đồng - Giảm 10%</li>
      <li>Kim cương: Tích lũy từ 15 triệu đồng - Giảm 15%</li>
    </ul>
    
    <p>Thành viên còn được ưu tiên đặt chỗ và nhận quà tặng sinh nhật đặc biệt.</p>`,
        image: "/khuyen-mai-ve-tau-2.jpg",
        date: "2025-11-15",
        category: "Khuyến mãi",
        author: "Ngô Thị Lan"
    },
    {
        id: 12,
        title: "Du lịch bằng tàu hỏa: Xu hướng mới của giới trẻ Việt Nam",
        summary: "Ngày càng nhiều bạn trẻ lựa chọn tàu hỏa như một phần của trải nghiệm du lịch, không chỉ là phương tiện di chuyển.",
        content: `<h2>Tàu hỏa - Điểm đến của giới trẻ</h2>
    <p>Khảo sát mới nhất cho thấy 65% du khách dưới 30 tuổi coi việc đi tàu là một phần quan trọng của chuyến du lịch.</p>
    
    <h3>Lý do được yêu thích</h3>
    <ul>
      <li>Ngắm cảnh dọc đường một cách thư thái</li>
      <li>Cơ hội gặp gỡ và trò chuyện với người lạ</li>
      <li>Chi phí hợp lý hơn máy bay</li>
      <li>Không gian để làm việc hoặc nghỉ ngơi</li>
      <li>Thân thiện với môi trường</li>
    </ul>
    
    <p>Nhiều bạn trẻ còn tổ chức các chuyến đi nhóm bằng tàu để tăng sự gắn kết.</p>`,
        image: "/hinh-anh-tau.jpg",
        date: "2025-11-12",
        category: "Du lịch",
        author: "Bùi Văn Hùng"
    },
    {
        id: 13,
        title: "Khai trương phòng chờ VIP tại ga Đà Nẵng với diện tích 500m²",
        summary: "Phòng chờ VIP mới tại ga Đà Nẵng mang đến không gian sang trọng, yên tĩnh cho hành khách hạng thương gia.",
        content: `<h2>Phòng chờ đẳng cấp 5 sao</h2>
    <p>Ga Đà Nẵng vừa khai trương phòng chờ VIP với diện tích lên đến 500m², được thiết kế hiện đại và sang trọng.</p>
    
    <h3>Tiện ích nổi bật</h3>
    <ul>
      <li>Khu vực làm việc riêng biệt</li>
      <li>Buffet thức ăn và đồ uống cao cấp</li>
      <li>Phòng nghỉ ngắn hạn</li>
      <li>Dịch vụ spa và massage</li>
      <li>WiFi tốc độ cao</li>
    </ul>
    
    <p>Vé vào phòng chờ chỉ 200.000đ hoặc miễn phí cho khách hàng thương gia.</p>`,
        image: "/tau-nha-hang.jpg",
        date: "2025-11-10",
        category: "Dịch vụ",
        author: "Hoàng Thị Thu"
    },
    {
        id: 14,
        title: "Hợp tác với Grab: Dịch vụ đưa đón từ ga tàu đến nơi ở",
        summary: "Vé Tàu Việt và Grab bắt tay hợp tác mang đến dịch vụ trọn gói cho hành khách.",
        content: `<h2>Dịch vụ kết nối liền mạch</h2>
    <p>Hợp tác chiến lược giữa Vé Tàu Việt và Grab giúp khách hàng có thể đặt xe đưa đón ngay khi mua vé tàu.</p>
    
    <h3>Ưu đãi đặc biệt</h3>
    <ul>
      <li>Giảm 30% cho chuyến xe đầu tiên</li>
      <li>Tích điểm kép cho cả hai dịch vụ</li>
      <li>Ưu tiên phục vụ tại ga tàu</li>
      <li>Hỗ trợ 24/7</li>
    </ul>
    
    <p>Dịch vụ có mặt tại 15 ga tàu lớn trên toàn quốc.</p>`,
        image: "/hinh-anh-tau-2.jpg",
        date: "2025-11-08",
        category: "Đối tác",
        author: "Trịnh Văn Long"
    },
    {
        id: 15,
        title: "Lịch sử 100 năm đường sắt Việt Nam qua những con số",
        summary: "Nhìn lại hành trình phát triển của ngành đường sắt Việt Nam từ những ngày đầu thành lập.",
        content: `<h2>Một thế kỷ phát triển</h2>
    <p>Đường sắt Việt Nam đã có hơn 100 năm lịch sử với nhiều dấu ấn quan trọng.</p>
    
    <h3>Các mốc son</h3>
    <ul>
      <li>1936: Đường sắt Bắc Nam hoàn thành</li>
      <li>1975: Thống nhất đường sắt cả nước</li>
      <li>2000: Hiện đại hóa đầu máy và toa xe</li>
      <li>2015: Khởi công đường sắt cao tốc</li>
      <li>2025: Ra mắt tàu cao tốc đầu tiên</li>
    </ul>
    
    <p>Hiện nay, mạng lưới đường sắt Việt Nam dài hơn 3000km phục vụ hàng triệu lượt khách mỗi năm.</p>`,
        image: "/hinh-anh-tau-3.jpg",
        date: "2025-11-05",
        category: "Lịch sử",
        author: "Đặng Thị Hà"
    },
    {
        id: 16,
        title: "Mẹo tiết kiệm chi phí khi đi tàu cho sinh viên và người thu nhập thấp",
        summary: "Hướng dẫn chi tiết cách đặt vé tàu giá rẻ và các chương trình ưu đãi đặc biệt.",
        content: `<h2>Đi tàu tiết kiệm hiệu quả</h2>
    <p>Với một số mẹo nhỏ, bạn có thể tiết kiệm đáng kể chi phí đi tàu.</p>
    
    <h3>Mẹo hữu ích</h3>
    <ul>
      <li>Đặt vé sớm để được giảm giá 15-20%</li>
      <li>Chọn giờ tàu chạy ít người để vé rẻ hơn</li>
      <li>Sử dụng thẻ sinh viên để được giảm 10%</li>
      <li>Mua vé khứ hồi để được ưu đãi</li>
      <li>Theo dõi các chương trình flash sale</li>
    </ul>
    
    <p>Áp dụng đồng thời nhiều ưu đãi có thể giúp bạn tiết kiệm đến 50% giá vé.</p>`,
        image: "/khuyen-mai-ve-tau-3.jpg",
        date: "2025-11-03",
        category: "Mẹo hay",
        author: "Vũ Thị Nga"
    },
    {
        id: 17,
        title: "Tuyến đường sắt xuyên Á: Việt Nam sắp kết nối với Trung Quốc và ASEAN",
        summary: "Dự án đường sắt xuyên Á hứa hẹn mở ra cơ hội du lịch và thương mại mới cho Việt Nam.",
        content: `<h2>Dự án đầy tham vọng</h2>
    <p>Dự án đường sắt xuyên Á với tổng chiều dài hơn 15.000km sẽ kết nối Việt Nam với các nước trong khu vực và xa hơn nữa.</p>
    
    <h3>Lợi ích kỳ vọng</h3>
    <ul>
      <li>Tăng cường du lịch quốc tế</li>
      <li>Thúc đẩy thương mại khu vực</li>
      <li>Tạo hàng nghìn việc làm mới</li>
      <li>Giảm chi phí vận chuyển hàng hóa</li>
    </ul>
    
    <p>Dự kiến hoàn thành vào năm 2030.</p>`,
        image: "/hinh-anh-tau-4.jpg",
        date: "2025-11-01",
        category: "Quốc tế",
        author: "Lý Văn Minh"
    },
    {
        id: 18,
        title: "Tàu hỏa thân thiện môi trường: Sử dụng năng lượng sạch từ năm 2027",
        summary: "Kế hoạch chuyển đổi sang năng lượng xanh của ngành đường sắt Việt Nam.",
        content: `<h2>Hướng tới tương lai bền vững</h2>
    <p>Tổng công ty Đường sắt Việt Nam công bố kế hoạch chuyển đổi 50% đoàn tàu sang sử dụng năng lượng điện sạch vào năm 2027.</p>
    
    <h3>Lộ trình thực hiện</h3>
    <ul>
      <li>2026: Thí điểm 10 đầu máy điện</li>
      <li>2027: Mở rộng lên 50 đầu máy</li>
      <li>2030: 100% đoàn tàu sử dụng năng lượng sạch</li>
    </ul>
    
    <p>Dự án sẽ giảm 40% lượng khí thải carbon của ngành.</p>`,
        image: "/hinh-anh-tau-5.jpg",
        date: "2025-10-28",
        category: "Môi trường",
        author: "Phan Thị Loan"
    },
    {
        id: 19,
        title: "Ứng dụng di động Vé Tàu Việt cập nhật nhiều tính năng mới",
        summary: "Phiên bản 3.0 với giao diện mới và nhiều tính năng thông minh hơn.",
        content: `<h2>Trải nghiệm di động được nâng cấp</h2>
    <p>Ứng dụng Vé Tàu Việt phiên bản 3.0 chính thức ra mắt với nhiều cải tiến đáng kể.</p>
    
    <h3>Tính năng mới</h3>
    <ul>
      <li>Đặt vé nhanh chỉ trong 30 giây</li>
      <li>Thanh toán bằng vân tay/nhận diện khuôn mặt</li>
      <li>Thông báo real-time về trạng thái tàu</li>
      <li>Bản đồ tích hợp chỉ đường đến ga</li>
      <li>Chatbot hỗ trợ 24/7</li>
    </ul>
    
    <p>Tải miễn phí trên App Store và Google Play.</p>`,
        image: "/banner-uu-dai-ve-tau.jpg",
        date: "2025-10-25",
        category: "Công nghệ",
        author: "Nguyễn Văn Sơn"
    },
    {
        id: 20,
        title: "Khám phá ẩm thực trên tàu: Từ cơm hộp truyền thống đến cao cấp",
        summary: "Sự phát triển của dịch vụ ăn uống trên tàu hỏa Việt Nam qua các thời kỳ.",
        content: `<h2>Ẩm thực hành trình</h2>
    <p>Dịch vụ ăn uống trên tàu đã có sự thay đổi đáng kể, từ cơm hộp giản đơn đến các món ăn cao cấp.</p>
    
    <h3>Thực đơn đa dạng</h3>
    <ul>
      <li>Cơm hộp phổ thông: 50.000đ</li>
      <li>Set ăn Á: 120.000đ</li>
      <li>Set ăn Âu: 180.000đ</li>
      <li>Món đặc sản địa phương: 150.000đ</li>
      <li>Thực đơn chay: 80.000đ</li>
    </ul>
    
    <p>Tất cả món ăn đều được chế biến tươi ngay trên tàu.</p>`,
        image: "/do-an-tau-hoa.jpg",
        date: "2025-10-22",
        category: "Ẩm thực",
        author: "Trương Thị Kim"
    }
];

// Helper functions
export function getAllNews(): NewsArticle[] {
    return newsArticles;
}

export function getNewsById(id: number): NewsArticle | undefined {
    return newsArticles.find(article => article.id === id);
}

export function getRelatedNews(currentId: number, limit: number = 3): NewsArticle[] {
    return newsArticles
        .filter(article => article.id !== currentId)
        .slice(0, limit);
}

export function getNewsByPage(page: number = 1, itemsPerPage: number = 8): {
    articles: NewsArticle[];
    totalPages: number;
    currentPage: number;
} {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
        articles: newsArticles.slice(startIndex, endIndex),
        totalPages: Math.ceil(newsArticles.length / itemsPerPage),
        currentPage: page
    };
}

