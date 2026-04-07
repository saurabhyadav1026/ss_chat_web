import { useContext } from "react";
import ChatContext from "../../contexts/chatscontext/AppVariablesContext";

const PicShow = () => {
  const { picShow, setPicShow }: any = useContext(ChatContext);

  if (!picShow.status) return <></>;

  return (
    <div className="picture-modal" onClick={() => setPicShow({ status: false })}>
      <div className="picture-modal__card">
        <img src={picShow.url} className="picture-modal__image" />
      </div>
    </div>
  );
};

export default PicShow;
