import React from "react";

export default function avatar() {
  return (
    <div class="PhotoField_fieldContentEdit__8iE7p">
      <div class="PhotoField_contentBody__fl5E5">
        Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.
      </div>
      <div class="PhotoField_contentImage__zbcdo">
        <div class="PhotoField_avatar__Qdo+k">
          <div class="FallbackAvatar_avatar__gmj3S" style="--font-size:8.9px;">
            <img
              src="https://graph.facebook.com/3000522206844033/picture?width=400&amp;height=400"
              alt="Công Trung"
            />
          </div>
        </div>
        <label for="avatar">
          <div class="PhotoField_chooseAva__w-IYZ">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="camera"
              class="svg-inline--fa fa-camera PhotoField_chooseImg__-hTB8"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"
              ></path>
            </svg>
          </div>
          <div class="PhotoField_pickAva__h-Ysn">
            <input type="file" accept="image/jpg, image/jpeg, image/png" id="avatar" />
          </div>
        </label>
      </div>
    </div>
  );
}
