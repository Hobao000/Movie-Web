import { usePathname } from 'next/navigation';

export const useActivePath = () => {
  const pathname = usePathname();

  /**
   * Kiểm tra xem một đường dẫn có đang hoạt động hay không.
   * Hỗ trợ bắt cả các trang con (ví dụ: /movie/123 vẫn tính là /movie)
   */
  const checkActive = (path: string) => {
    //Trường hợp trang chủ: Phải khớp hoàn toàn để tránh việc trang nào cũng đỏ
    if (path === '/') {
      return pathname === '/';
    }

    //Các trường hợp khác (Movies, TV Series): Chỉ cần bắt đầu bằng path đó
    // Ví dụ: /movie/799882 bắt đầu bằng /movie => true
    return pathname.startsWith(path);
  };

  return { pathname, checkActive };
};