import { MovieResponse } from '@/types/movie';

export const BANNED_REGEX = /\b(18+|sex|porn|jav|hentai|xxx|gays?|lesbians?|boobs?|tits?|fuck|child|kids|lolis?|incest|erotic|nude|nsfw|gore|bitch)\b|(phim\s*cấp\s*3|đụ|địt|phò|điếm|lồn|cặc|đỹ|đĩ|chịch)/iu;

export const filterCleanContent = (response: MovieResponse): MovieResponse => {
  // Nếu không có dữ liệu thì trả về nguyên vẹn
  if (!response || !response.results) return response;

  response.results = response.results.filter((item) => {
    // Chặn API đánh dấu adult = true
    if (item.adult === true) return false;

    // Gom Tên phim, Tên gốc và Nội dung phim
    const title = item.title || item.name || "";
    const originalTitle = item.original_title || item.original_name || "";
    const overview = item.overview || "";

    // Biến toàn data của 1 bộ phim (bao gồm cả mảng thể loại, diễn viên nếu có) thành 1 chuỗi văn bản dài.
    const everythingElse = JSON.stringify(item).toLowerCase();

    // Gộp tất cả lại thành 1 chuỗi
    const textToCheck = `${title} ${originalTitle} ${overview} ${everythingElse}`.toLowerCase();

    // Quét Regex: Trả về TRUE nếu KHÔNG chứa từ cấm
    return !BANNED_REGEX.test(textToCheck);
  });

  return response;
};