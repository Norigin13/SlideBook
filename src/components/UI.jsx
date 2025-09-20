import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

const pictures = [
  "dot",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const bookOpenAtom = atom(false);
export const contentSectionAtom = atom(0);

// Nội dung cho từng trang - mỗi trang có thể có nhiều phần
const pageContents = {
  0: {
    title: "TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐỘC LẬP DÂN TỘC VÀ CHỦ NGHĨA XÃ HỘI",
    sections: [
      {
        content:
          "Chào mừng bạn đến với cuốn sách về tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội.",
      },
    ],
  },
  1: {
    title: "1. Vấn đề độc lập dân tộc",
    sections: [
      {
        content:
          "Độc lập, tự do là quyền thiêng liêng, bất khả xâm phạm của mọi dân tộc. Từ ngàn xưa, lịch sử Việt Nam gắn liền với truyền thống yêu nước và đấu tranh chống giặc ngoại xâm, thể hiện khát vọng có được nền độc lập và tự do cho nhân dân – một giá trị thiêng liêng mà Hồ Chí Minh luôn hiện thân.\n\n Năm 1919, nhân dịp các nước Đồng minh thắng trận trong Chiến tranh thế giới thứ nhất họp Hội nghị Vécxây (Pháp), thay mặt những người Việt Nam yêu nước, Hồ Chí Minh gửi Bản Yêu sách của nhân dân An Nam tới Hội nghị Vécxây, bao gồm 8 điểm với hai nội dung chính là đời quyền bình đẳng về mặt pháp lý và đòi các quyển tự do, dân chủ của người dân Đông Dương, Bản yêu sách không được Hội nghị chấp nhận nhưng qua sự kiện trên cho thấy lần đầu tiên, tư tưởng Hồ Chí Minh về quyền của các dân tộc thuộc địa mà trước hết là quyền bình đẳng và tự do đã hình thành, thể hiện tư tưởng về quyền dân tộc và quyền con người hình thành từ sớm. ",
      },

      {
        content:
          "Trong Chánh cương vắn tắt của Đảng (1930), Người xác định mục tiêu chính trị là đánh đổ đế quốc chủ nghĩa Pháp và bọn phong kiến và Làm cho nước Nam hoàn toàn độc lập.\n\n Trong Tuyên ngôn độc lập 1945, Hồ Chí Minh trịnh trọng tuyên bố Việt Nam có quyền hưởng tự do và độc lập, đồng thời kêu gọi toàn dân quyết tâm bảo vệ nền độc lập đó. Tư tưởng này được cụ thể hóa qua các cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, người đã nói với đồng bào và các quốc gia trên thế giới : “Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thực đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mệnh và của cải để giữ vững quyền tự do và độc lập ấy”.\n\n Trong Lời kêu gọi toàn quốc kháng chiến  19/12/1946 với những lời hiệu triệu nổi tiếng như “Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ” và “Không có gì quý hơn độc lập, tự do”, trở thành tuyên ngôn bất hủ, khích lệ nhân dân Việt Nam anh dũng chiến đấu, bảo vệ chủ quyền, toàn vẹn lãnh thổ và quyền dân tộc cơ bản. ",
      },
    ],
  },
  2: {
    title: "Độc Lập Dân Tộc",
    sections: [
      {
        content:
          "Độc lập dân tộc là mục tiêu thiêng liêng mà toàn thể nhân dân Việt Nam đã đấu tranh để giành lấy. Đây không chỉ là quyền tự quyết của một dân tộc mà còn là nền tảng cho sự phát triển bền vững và thịnh vượng của đất nước.",
      },
      {
        content:
          "Trong Tuyên ngôn độc lập 1945, Hồ Chí Minh trịnh trọng tuyên bố Việt Nam có quyền hưởng tự do và độc lập, đồng thời kêu gọi toàn dân quyết tâm bảo vệ nền độc lập đó. Tư tưởng này được cụ thể hóa qua các cuộc kháng chiến chống thực dân Pháp và đế quốc Mỹ, người đã nói với đồng bào và các quốc gia trên thế giới : “Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thực đã thành một nước tự do và độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mệnh và của cải để giữ vững quyền tự do và độc lập ấy”",
      },
    ],
  },
  3: {
    title: "Tự Do và Dân Chủ",
    sections: [
      {
        content:
          "Tự do và dân chủ là những giá trị cốt lõi mà nhân dân Việt Nam luôn hướng tới. Trong một xã hội tự do, mỗi công dân đều có quyền được sống, làm việc và phát triển trong môi trường công bằng và bình đẳng.",
      },
    ],
  },
  4: {
    title: "Hạnh Phúc Nhân Dân",
    sections: [
      {
        content:
          "Hạnh phúc của nhân dân là mục tiêu cao nhất của mọi chính sách và hành động. Đó là sự kết hợp hài hòa giữa phát triển kinh tế, công bằng xã hội và bảo vệ môi trường, tạo nên một cuộc sống đầy đủ và ý nghĩa cho mọi người dân.",
      },
    ],
  },
};

export const pages = [
  {
    front: "HCM",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "Chủ Tịch Hồ Chí Minh",
});

// Component hiển thị nội dung trang
const PageContent = ({ pageNumber, isOpen }) => {
  const content = pageContents[pageNumber] || pageContents[0];
  const [isMobile, setIsMobile] = useState(false);
  const [currentSection, setCurrentSection] = useAtom(contentSectionAtom);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset section khi chuyển trang
  useEffect(() => {
    setCurrentSection(0);
  }, [pageNumber, setCurrentSection]);

  if (!isOpen) return null;

  const sections = content.sections || [];
  const currentContent = sections[currentSection] || sections[0];
  const hasNextSection = currentSection < sections.length - 1;
  const hasPrevSection = currentSection > 0;

  // Debug
  console.log("Debug mobile content:", {
    content,
    sections,
    currentSection,
    currentContent,
    hasNextSection,
    hasPrevSection,
  });

  // Mobile layout: content ở dưới màn hình
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-black/90 to-black/50 backdrop-blur-sm z-50 flex flex-col">
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide mobile-scroll-container">
          <div className="text-white p-4 pb-2 min-h-full">
            <h2 className="text-2xl font-bold mb-4 break-words">
              {content.title}
            </h2>
            <p className="text-base leading-relaxed break-words whitespace-pre-line">
              {currentContent?.content ||
                content.sections?.[0]?.content ||
                "Không có nội dung"}
            </p>
          </div>
        </div>

        {/* Fixed navigation buttons */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center p-4 pt-2 gap-2 bg-gradient-to-t from-black/80 to-transparent">
            <button
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                hasPrevSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Previous button clicked", {
                  hasPrevSection,
                  currentSection,
                });
                if (hasPrevSection) {
                  setCurrentSection(currentSection - 1);
                }
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-sm text-white/70">
              {currentSection + 1}/{sections.length}
            </span>

            <button
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                hasNextSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Next button clicked", {
                  hasNextSection,
                  currentSection,
                });
                if (hasNextSection) {
                  setCurrentSection(currentSection + 1);
                }
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout: content ở bên trái
  return (
    <div className="fixed left-0 top-0 h-full w-[30vw] min-w-[300px] max-w-[90vw] bg-gradient-to-r from-black/80 to-black/20 backdrop-blur-sm z-50 pointer-events-none flex flex-col p-8 pb-28 transform transition-transform duration-500 ease-in-out">
      <div className="text-white max-w-lg pointer-events-auto w-full flex-1 flex flex-col">
        <h2 className="text-4xl font-bold mb-6 text-left break-words">
          {content.title}
        </h2>
        <p className="text-lg leading-relaxed text-left break-words whitespace-pre-line flex-1">
          {currentContent.content}
        </p>

        {/* Nút chuyển đổi phần */}
        {sections.length > 1 && (
          <div className="flex justify-between items-center mt-6 gap-4 relative z-60">
            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 pointer-events-auto cursor-pointer relative z-70 ${
                hasPrevSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Desktop Previous button clicked", {
                  hasPrevSection,
                  currentSection,
                });
                if (hasPrevSection) {
                  setCurrentSection(currentSection - 1);
                }
              }}
              disabled={!hasPrevSection}
            >
              ← Phần trước
            </button>

            <span className="text-sm text-white/70">
              {currentSection + 1}/{sections.length}
            </span>

            <button
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 pointer-events-auto cursor-pointer relative z-70 ${
                hasNextSection
                  ? "bg-white/20 text-white hover:bg-white/30"
                  : "bg-gray-500/20 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                console.log("Desktop Next button clicked", {
                  hasNextSection,
                  currentSection,
                });
                if (hasNextSection) {
                  setCurrentSection(currentSection + 1);
                }
              }}
              disabled={!hasNextSection}
            >
              Phần sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [bookOpen, setBookOpen] = useAtom(bookOpenAtom);
  const [bgKey, setBgKey] = useState("1");
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Khởi tạo audio và enable sau user interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
    };
  }, []);

  useEffect(() => {
    if (!audioEnabled) return;

    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.volume = 0.3; // Giảm volume để không quá to

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Audio play failed:", error.message);
        // Không hiển thị error để tránh làm phiền user
      }
    };

    playAudio();
  }, [page, audioEnabled]);

  // Tự động mở sách khi click vào trang
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    setBookOpen(true);
  };

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col overflow-x-hidden">
        <a className="pointer-events-auto mt-10 ml-10" href="">
          {/* <img
            className="w-20 max-w-full"
            src="/images/wawasensei-white.png"
            alt="WAWA SENSEI"
          /> */}
        </a>
        {/* Switch background options - dropdown top-center */}
        <div className="pointer-events-auto fixed top-6 left-1/2 -translate-x-1/2 z-30">
          <select
            className="bg-black/40 text-white px-3 py-2 rounded-lg border border-white/30 backdrop-blur-sm text-sm md:text-base"
            value={bgKey}
            onChange={(e) => {
              const value = e.target.value;
              setBgKey(value);
              const map = {
                1: "/textures/background.jpg",
                2: "/textures/DSC01040.jpg",
                3: "/textures/DSC02064.jpg",
              };
              document.documentElement.style.setProperty(
                "--app-bg-image",
                `url('${map[value]}')`
              );
            }}
          >
            <option value="1">Hình nền 1</option>
            <option value="2">Hình nền 2</option>
            <option value="3">Hình nền 3</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto pointer-events-auto flex justify-center relative z-60 bg-gradient-to-t from-black/60 to-transparent">
          <div className="overflow-x-auto flex items-center gap-2 md:gap-4 max-w-full p-2 md:p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => handlePageClick(index)}
              >
                {index === 0 ? "Mặt trước" : `Trang ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300 px-2 py-1 md:px-4 md:py-3 rounded-full text-xs md:text-lg uppercase shrink-0 border min-h-[44px] ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => handlePageClick(pages.length)}
            >
              Mặt sau
            </button>
          </div>
        </div>
      </main>

      {/* Hiển thị nội dung trang khi sách mở */}
      <PageContent pageNumber={page} isOpen={bookOpen} />

      {/* Nút đóng sách */}
      {bookOpen && (
        <button
          className="fixed top-4 right-4 z-30 bg-white/90 text-black px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setBookOpen(false)}
        >
          ✕ Đóng
        </button>
      )}
    </>
  );
};
