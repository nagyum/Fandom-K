import CustomButton from "../CustomButtom/CustomButton";
import style from "./Refresh.module.scss";
import logoImg from "../../assets/images/logoImage.svg";

//height: 차지할 면적 높이
function Refresh({ handleLoad = () => {}, height }) {
  const onclickRefreshBtn = () => {
    handleLoad();
  };

  return (
    <div className={style.refresh} style={{ height: `${height}px` }}>
      <div className={style.refresh_wrap}>
        <img src={logoImg} alt="로고 이미지" />
        <div className={style.refresh_content}>
          <p>서버에서 데이터를 불러오는데</p>
          <p>실패했습니다.</p>
        </div>
        <CustomButton className={style.refresh_btn} onClick={onclickRefreshBtn}>
          새로고침
        </CustomButton>
      </div>
    </div>
  );
}

export default Refresh;
