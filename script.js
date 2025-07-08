// ========================================
// 줌 방지 모듈
// ========================================

// 줌 방지 이벤트 리스너들
function preventZoom() {
  // 휠 이벤트로 인한 줌 방지
  document.addEventListener(
    "wheel",
    function (e) {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // 키보드 단축키로 인한 줌 방지
  document.addEventListener("keydown", function (e) {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "+" || e.key === "-" || e.key === "=")
    ) {
      e.preventDefault();
    }
  });

  // 터치 이벤트로 인한 줌 방지
  document.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    function (e) {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // 더블탭으로 인한 줌 방지
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (e) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false }
  );
}

// ========================================
// 초기 로딩 애니메이션 모듈
// ========================================

// 초기 로딩 애니메이션
async function showInitialAnimation() {
  const overlay = document.getElementById("loading-overlay");
  const heartImage = overlay.querySelector("img");
  const body = document.body;

  // 스크롤 방지
  body.classList.add("scroll-locked");

  // 1.3초 대기 (심장 박동 애니메이션)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 하트 이미지에 fade-out 클래스 추가 (확대되면서 페이드아웃)
  heartImage.classList.add("fade-out");

  // 0.5초 후 오버레이 페이드 아웃
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 500);

  // 스크롤 허용
  body.classList.remove("scroll-locked");

  // 오버레이 완전히 제거
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000);
}

// ========================================
// 갤러리 캐러셀 모듈
// ========================================

// 갤러리 상태 변수
let currentSlideIndex = 1;
const totalSlides = 7;
let isTransitioning = false;
const animationDuration = 200;

// 갤러리 초기화
function initGallery() {
  updateSlide();
}

// 다음 슬라이드로 이동
function nextSlide() {
  if (isTransitioning) return;

  isTransitioning = true;
  currentSlideIndex++;
  updateSlide();

  // 무한 캐러셀 처리
  if (currentSlideIndex >= totalSlides + 1) {
    setTimeout(() => {
      currentSlideIndex = 1;
      updateSlide(false);
    }, animationDuration);
  }

  setTimeout(() => {
    isTransitioning = false;
  }, animationDuration);
}

// 이전 슬라이드로 이동
function prevSlide() {
  if (isTransitioning) return;

  isTransitioning = true;
  currentSlideIndex--;
  updateSlide();

  // 무한 캐러셀 처리
  if (currentSlideIndex <= 0) {
    setTimeout(() => {
      currentSlideIndex = totalSlides;
      updateSlide(false);
    }, animationDuration);
  }

  setTimeout(() => {
    isTransitioning = false;
  }, animationDuration);
}

// 슬라이드 위치 업데이트
function updateSlide(animate = true) {
  const wrapper = document.querySelector(".gallery-wrapper");
  const translateX = -currentSlideIndex * 14.2857;

  if (animate) {
    wrapper.style.transition = "transform 0.5s ease-in-out";
  } else {
    wrapper.style.transition = "none";
  }

  wrapper.style.transform = `translateX(${translateX}%)`;
}

// 터치/마우스 이벤트 처리
function addTouchEvents() {
  const wrapper = document.querySelector(".gallery-wrapper");
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let isDragging = false;
  let touchDirection = null; // 'horizontal', 'vertical', null

  // 터치 이벤트
  wrapper.addEventListener("touchstart", (e) => {
    if (isTransitioning) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
    touchDirection = null;
  });

  wrapper.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);

    // 터치 방향이 아직 결정되지 않았을 때만 계산
    if (touchDirection === null && (diffX > 10 || diffY > 10)) {
      // 각도 계산 (수평에서 벗어난 각도)
      const angle = Math.atan2(diffY, diffX) * (180 / Math.PI);

      // 45도 기준으로 수평/수직 구분
      if (angle < 45) {
        touchDirection = "horizontal";
      } else {
        touchDirection = "vertical";
      }
    }

    // 수평 스와이프인 경우에만 기본 스크롤 방지
    if (touchDirection === "horizontal") {
      e.preventDefault();
    }
    // 수직 스크롤인 경우 기본 스크롤 허용 (preventDefault 하지 않음)
  });

  wrapper.addEventListener("touchend", (e) => {
    if (!isDragging || isTransitioning) return;

    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    const threshold = 50;

    // 수평 스와이프였고 임계값을 넘은 경우에만 슬라이드 변경
    if (touchDirection === "horizontal" && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging = false;
    touchDirection = null;
  });

  // 마우스 이벤트 (데스크톱용)
  let mouseDirection = null;

  wrapper.addEventListener("mousedown", (e) => {
    if (isTransitioning) return;
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
    mouseDirection = null;
  });

  wrapper.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const diffX = Math.abs(currentX - startX);
    const diffY = Math.abs(currentY - startY);

    // 마우스 방향이 아직 결정되지 않았을 때만 계산
    if (mouseDirection === null && (diffX > 10 || diffY > 10)) {
      const angle = Math.atan2(diffY, diffX) * (180 / Math.PI);

      if (angle < 45) {
        mouseDirection = "horizontal";
      } else {
        mouseDirection = "vertical";
      }
    }

    // 수평 드래그인 경우에만 기본 동작 방지
    if (mouseDirection === "horizontal") {
      e.preventDefault();
    }
  });

  wrapper.addEventListener("mouseup", (e) => {
    if (!isDragging || isTransitioning) return;

    endX = e.clientX;
    endY = e.clientY;
    const diffX = startX - endX;
    const diffY = startY - endY;
    const threshold = 50;

    // 수평 드래그였고 임계값을 넘은 경우에만 슬라이드 변경
    if (mouseDirection === "horizontal" && Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    isDragging = false;
    mouseDirection = null;
  });

  wrapper.addEventListener("mouseleave", () => {
    isDragging = false;
    mouseDirection = null;
  });
}

// ========================================
// 카카오맵 모듈
// ========================================

// 카카오맵 변수
let map;
let marker;

// 카카오맵 초기화
function initKakaoMap() {
  if (typeof kakao === "undefined" || !kakao.maps) {
    showMapError("카카오맵 API가 로드되지 않았습니다");
    return;
  }
  if (typeof kakao.maps.load !== "function") {
    showMapError(
      "kakao.maps.load 함수가 없습니다. 스크립트 옵션을 확인하세요."
    );
    return;
  }
  kakao.maps.load(function () {
    console.log("지도 생성 시작");
    createMap();
  });
}

// 지도 생성
function createMap() {
  if (typeof kakao === "undefined") {
    showMapError("카카오맵 API가 로드되지 않았습니다");
    return;
  }

  // 키워드 검색을 사용하여 정확한 "루벨 강동" 위치 찾기
  const places = new kakao.maps.services.Places();

  places.keywordSearch("루벨 강동", (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      // 첫 번째 검색 결과가 가장 정확한 위치
      const place = data[0];
      const coords = new kakao.maps.LatLng(place.y, place.x);
      createMapWithCoords(coords, place.place_name);
    } else {
      // 키워드 검색 실패 시 주소 검색으로 폴백
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch("서울 강동구 천호대로 1077", (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          createMapWithCoords(
            new kakao.maps.LatLng(result[0].y, result[0].x),
            "이스트센트럴타워"
          );
        } else {
          showMapError("주소를 찾을 수 없습니다");
        }
      });
    }
  });
}

// 좌표로 지도 생성
function createMapWithCoords(coords, placeName = "루벨 강동") {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: coords,
    level: 3,
  };

  map = new kakao.maps.Map(mapContainer, mapOption);
  marker = new kakao.maps.Marker({
    map: map,
    position: coords,
  });

  const infowindow = new kakao.maps.InfoWindow({
    content: `<div style="padding:5px;font-size:12px;">${placeName}</div>`,
  });

  // 마커 이벤트
  kakao.maps.event.addListener(marker, "mouseover", () => {
    infowindow.open(map, marker);
  });

  kakao.maps.event.addListener(marker, "mouseout", () => {
    infowindow.close();
  });

  kakao.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
}

// 지도 에러 표시
function showMapError(message) {
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666; font-size: 14px;">
        <div style="text-align: center;">
          <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 10px; color: #ff6b6b;"></i><br>
          ${message}
        </div>
      </div>
    `;
  }
}

// 외부 맵 열기
function openKakaoMap() {
  window.open(`https://kko.kakao.com/K67AN7J__V`, "_blank");
}

function openNaverMap() {
  window.open(`https://naver.me/5r9z4Z05`, "_blank");
}

function openTmap() {
  const address = encodeURIComponent(
    "서울시 강동구 천호대로 1077 이스트센트럴타워"
  );
  window.open(`https://tmap.co.kr/search?keyword=${address}`, "_blank");
}

// ========================================
// 스크롤 기능 모듈
// ========================================

// 위치 안내 섹션으로 스크롤
function scrollToLocation() {
  const locationSection = document.getElementById("location");
  if (locationSection) {
    locationSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// ========================================
// 계좌번호 섹션 기능
// ========================================

// 계좌번호 섹션 토글
function toggleAccount(type) {
  const content = document.getElementById(`${type}-account`);
  const arrow = document.getElementById(`${type}-arrow`);
  const header = arrow.parentElement;

  if (!content.classList.contains("open")) {
    content.classList.add("open");
    header.classList.add("active");
  } else {
    content.classList.remove("open");
    header.classList.remove("active");
  }
}

// 계좌번호 복사
function copyAccount(accountNumber) {
  // 하이픈 제거된 계좌번호를 하이픈과 함께 포맷팅
  let formattedAccount = accountNumber;

  // 계좌번호 패턴에 따라 하이픈 추가
  if (accountNumber.startsWith("1002")) {
    formattedAccount = accountNumber.replace(
      /(\d{4})(\d{3})(\d{6})/,
      "$1-$2-$3"
    );
  } else if (accountNumber.startsWith("302")) {
    formattedAccount = accountNumber.replace(
      /(\d{3})(\d{4})(\d{4})(\d{2})/,
      "$1-$2-$3-$4"
    );
  }

  if (navigator.clipboard && window.isSecureContext) {
    // 클립보드 API 사용 (HTTPS 환경)
    navigator.clipboard
      .writeText(formattedAccount)
      .then(() => {
        showToast("계좌번호가 복사되었습니다.");
      })
      .catch(() => {
        fallbackCopyTextToClipboard(formattedAccount);
      });
  } else {
    // 폴백 방법 (HTTP 환경)
    fallbackCopyTextToClipboard(formattedAccount);
  }
}

// 폴백 복사 방법
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    showToast("계좌번호가 복사되었습니다.");
  } catch (err) {
    showToast("복사에 실패했습니다.");
  }

  document.body.removeChild(textArea);
}

// 토스트 메시지 표시
function showToast(message) {
  // 기존 토스트가 있으면 제거
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 24px;
    font-size: 14px;
    z-index: 1000;
    animation: toastFadeInOut 2s ease-in-out;
  `;

  // 토스트 애니메이션 CSS 추가
  if (!document.querySelector("#toast-style")) {
    const style = document.createElement("style");
    style.id = "toast-style";
    style.textContent = `
      @keyframes toastFadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  // 2초 후 토스트 제거
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  showInitialAnimation();
  initGallery();
  addTouchEvents();
  initKakaoMap();

  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // 한 번만 애니메이션 적용
        }
      });
    },
    {
      threshold: 0.2, // 20%만 보여도 애니메이션 실행
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});
