import * as cheerio from 'cheerio';

export const extractHeadings = (htmlContent:string)=>{
    const $ = cheerio.load(htmlContent);
    const headings:{
        id:string;
        text:string;
        level:number;
    }[] = [];

    $("h2,h3").each((i,element)=>{
        const text = $(element).text().trim();
        const level = parseInt(element.tagName.replace("h", ""), 10);
        const id = `heading-${i}`;

        // gán id cho tiêu đề
        $(element).attr("id",id);
        headings.push({id,text,level});
    });

    return {
        headings,
        updateHtml:$.html()
    };
}

/**
 * 1. import * as cheerio from "cheerio";

Dòng này nhập thư viện cheerio. Cheerio là một thư viện Node.js giúp phân tích và thao tác với HTML giống như jQuery. Nó cho phép bạn sử dụng cú pháp quen thuộc của jQuery để duyệt và tìm kiếm các phần tử trong HTML.

2. export const extractHeadings = (htmlContent: string) => { ... };

Định nghĩa một hàm có tên extractHeadings được export (có thể sử dụng ở các module khác). Hàm này nhận vào một chuỗi htmlContent (nội dung HTML) và trả về một object chứa hai thuộc tính: headings và updatedHtml.

3. const $ = cheerio.load(htmlContent);

Dòng này sử dụng cheerio.load() để tải nội dung HTML vào một đối tượng giống như jQuery, ký hiệu là $.  Đối tượng $ này cho phép bạn sử dụng các phương thức của jQuery để làm việc với HTML.

4. const headings: { id: string; text: string; level: number }[] = [];

Khai báo một biến headings là một mảng các object. Mỗi object trong mảng sẽ đại diện cho một tiêu đề và có ba thuộc tính:
* id: ID của tiêu đề (chuỗi).
* text: Nội dung của tiêu đề (chuỗi).
* level: Cấp độ của tiêu đề (số, 2 cho h2, 3 cho h3).

5. $("h2, h3").each((index, element) => { ... });

Dòng này sử dụng phương thức each() của Cheerio để duyệt qua tất cả các phần tử <h2> và <h3> trong HTML.  each() nhận vào một callback function, function này sẽ được gọi cho mỗi phần tử được tìm thấy.
* index: Chỉ số của phần tử hiện tại trong danh sách các phần tử được tìm thấy.
* element: Phần tử DOM hiện tại (kiểu Node).

6. const text = $(element).text().trim();

Lấy nội dung của tiêu đề (text) bằng phương thức text() của Cheerio và loại bỏ khoảng trắng ở đầu và cuối chuỗi bằng phương thức trim().

7. const level = parseInt(element.tagName.replace("h", ""), 10);

Xác định cấp độ của tiêu đề. element.tagName trả về tên thẻ (ví dụ: "H2", "H3").  replace("h", "") loại bỏ chữ "h" để còn lại "2" hoặc "3". parseInt(..., 10) chuyển chuỗi này thành số nguyên (hệ cơ số 10).

8. const id =heading-${index};

Tạo một ID duy nhất cho tiêu đề dựa trên chỉ số của nó.

9. $(element).attr("id", id);

Gán ID vừa tạo cho phần tử tiêu đề trong HTML bằng phương thức attr() của Cheerio.  Việc này sẽ thêm thuộc tính id vào thẻ tiêu đề trong HTML.

10. headings.push({ id, text, level });

Thêm thông tin về tiêu đề (id, text, level) vào mảng headings.

11. return { headings, updatedHtml: $.html() };

Trả về một object chứa:
* headings: Mảng các object chứa thông tin về các tiêu đề.
* updatedHtml: Nội dung HTML đã được cập nhật (đã thêm ID cho các tiêu đề) bằng phương thức $.html() của Cheerio.

Tóm lại: Hàm extractHeadings này giúp bạn lấy danh sách các tiêu đề (h2, h3) từ HTML, đồng thời thêm ID cho chúng và trả về HTML đã được cập nhật.  Việc thêm ID cho các tiêu đề rất hữu ích cho việc tạo mục lục hoặc liên kết đến các phần cụ thể trong trang web.
 * 
 */