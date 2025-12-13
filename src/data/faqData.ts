// FAQ data for contact page
export interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "Làm thế nào để đặt vé tàu trực tuyến?",
        answer: "Để đặt vé tàu trực tuyến, bạn chỉ cần: (1) Truy cập trang chủ và chọn tuyến đường, ngày đi, (2) Chọn chỗ ngồi phù hợp trên sơ đồ toa tàu, (3) Điền thông tin hành khách, (4) Thanh toán qua các phương thức: thẻ ATM, Visa/MasterCard, Momo, ZaloPay. Vé điện tử sẽ được gửi về email ngay sau khi thanh toán thành công.",
        category: "Đặt vé"
    },
    {
        id: 2,
        question: "Tôi có thể hủy hoặc đổi vé đã đặt không?",
        answer: "Có, bạn hoàn toàn có thể hủy hoặc đổi vé đã đặt. Hủy vé trước 7 ngày khởi hành: hoàn 90% giá trị vé. Trước 3 ngày: hoàn 70%. Trước 24 giờ: hoàn 50%. Đổi vé miễn phí nếu còn chỗ trống trên chuyến tàu mới. Vui lòng vào mục 'Quản lý đặt vé' hoặc liên hệ hotline 1900 xxxx để được hỗ trợ.",
        category: "Hủy/Đổi vé"
    },
    {
        id: 3,
        question: "Các phương thức thanh toán nào được chấp nhận?",
        answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán: Thẻ ATM nội địa (qua cổng thanh toán VNPay, OnePay), Thẻ quốc tế Visa/MasterCard/JCB, Ví điện tử (Momo, ZaloPay, ViettelPay, ShopeePay), Chuyển khoản ngân hàng, Thanh toán tại văn phòng/đại lý. Tất cả giao dịch đều được mã hóa và bảo mật tuyệt đối.",
        category: "Thanh toán"
    },
    {
        id: 4,
        question: "Làm sao để biết tàu có chạy đúng giờ không?",
        answer: "Bạn có thể theo dõi tình trạng chuyến tàu theo thời gian thực qua: (1) Website của chúng tôi tại mục 'Tra cứu chuyến tàu', (2) Ứng dụng di động Vé Tàu Việt, (3) Hotline 1900 xxxx, (4) Fanpage Facebook chính thức. Chúng tôi sẽ thông báo ngay nếu có bất kỳ thay đổi nào về lịch trình, thời gian khởi hành hoặc ga đến.",
        category: "Thông tin chuyến tàu"
    },
    {
        id: 5,
        question: "Tôi bị tính phí sai, phải làm gì?",
        answer: "Nếu bạn nhận thấy có sai sót trong việc tính phí, vui lòng liên hệ với chúng tôi ngay qua: (1) Hotline: 1900 xxxx (24/7), (2) Email: hotro@vetauviet.vn kèm theo mã đặt vé và ảnh chụp màn hình, (3) Chat trực tuyến trên website. Chúng tôi cam kết xử lý và phản hồi trong vòng 24 giờ làm việc. Nếu có sai sót, tiền sẽ được hoàn lại đầy đủ.",
        category: "Khiếu nại"
    },
    {
        id: 6,
        question: "Làm thế nào để trở thành đối tác/đại lý bán vé?",
        answer: "Chúng tôi rất hoan nghênh các đối tác muốn hợp tác kinh doanh. Vui lòng gửi email đến doitac@vetauviet.vn hoặc gọi hotline 024 xxxx xxxx (giờ hành chính) với thông tin: tên công ty/cá nhân, địa chỉ, số điện thoại, và mô tả ngắn về mô hình kinh doanh. Đội ngũ phát triển kinh doanh sẽ liên hệ lại trong vòng 3 ngày làm việc.",
        category: "Hợp tác"
    },
    {
        id: 7,
        question: "Trẻ em có cần mua vé riêng không?",
        answer: "Trẻ em dưới 6 tuổi đi cùng người lớn và không yêu cầu chỗ ngồi riêng được miễn phí vé. Trẻ em từ 6-10 tuổi được giảm 25% giá vé người lớn. Trẻ em trên 10 tuổi mua vé như người lớn. Lưu ý: Mỗi người lớn chỉ được kèm 1 trẻ em miễn phí, trẻ thứ 2 trở lên phải mua vé.",
        category: "Chính sách"
    },
    {
        id: 8,
        question: "Tôi có thể mang hành lý bao nhiêu kg?",
        answer: "Mỗi hành khách được phép mang: (1) Hành lý xách tay: tối đa 20kg, (2) Hành lý ký gửi: tối đa 30kg (có thu phí sau 20kg đầu tiên). Hành lý quá khổ hoặc vật phẩm nguy hiểm không được phép mang lên tàu. Chi tiết vui lòng xem quy định hành lý tại mục 'Hướng dẫn' hoặc liên hệ hotline.",
        category: "Hành lý"
    }
];

export function getAllFAQs(): FAQItem[] {
    return faqData;
}

export function getFAQsByCategory(category: string): FAQItem[] {
    return faqData.filter(faq => faq.category === category);
}

export function getFAQById(id: number): FAQItem | undefined {
    return faqData.find(faq => faq.id === id);
}
