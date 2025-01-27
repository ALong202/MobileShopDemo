/*
Đối tượng Router trong Express là cơ chế cho phép chi nhỏ ứng dụng thành các phần nhỏ, mỗi phần có thể xử lý một tập hợp cụ thể các yêu cầu HTTP (như GET, POST, PUT, DELETE...). 

Routes () cho tài nguyên sản phẩm
*/
import express from 'express'
import { 
    getProducts, 
    newProduct, 
    getProductDetails, 
    updateProduct,
    deleteProduct, 
    createProductReview,
    getProductReviews,
    deleteReview,
    canUserReview
} from '../controllers/productControllers.js'; // tự động xuất hiện khi gõ syntax get(getProducts)
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

// Tạo một đối tượng Router của Express mới để định nghĩa các tuyến đường (routes) cho ứng dụng.
const router = express.Router()

// Router route(dẫn) đến mục "/products" để get (nhận request) và đưa vào controller function (hàm điều khiển)
router.route("/products").get(getProducts);

//Router route(dẫn) đến mục "/products" để post sản phẩm mới
router.route("/admin/products").post(isAuthenticatedUser, newProduct);

//Router route(dẫn) đến mục "/products" để get thông tin 1 sản phẩm theo id cho sẵn
//router.route("/products/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getProductDetails);
router.route("/products/:id").get(getProductDetails);

//Router route(dẫn) đến mục "/products" để sửa sản phẩm theo id sản phẩm
router.route("/admin/products/:id").put(updateProduct);

//Router route(dẫn) đến mục "/products" để xóa 1 sản phẩm theo id sản phẩm
router.route("/admin/products/:id").delete(deleteProduct);

router
  .route("/reviews")
  // Lấy đánh giá sản phẩm
  .get(isAuthenticatedUser, getProductReviews)
  // Tạo đánh giá sản phẩm
  .put(isAuthenticatedUser, createProductReview);

router
  .route("/admin/reviews")
  // Xóa đánh giá (chỉ admin)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

router
// Kiểm tra người dùng có thể đánh giá không
  .route("/can_review").get(isAuthenticatedUser, canUserReview);



// để sử dụng trong các files. Khi 1 tệp (app.js) muốn import từ 1 module khác (product.js) thì cần export dữ liệu từ module đó (tương tự return)
export default router;

