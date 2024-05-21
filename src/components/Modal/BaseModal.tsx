import React, { FC, ReactNode } from "react";
import "./ModalStyle.css";
import { TitleText } from "../Text/CustomText";
import { IoClose } from "react-icons/io5";
import { IconButton } from "../Buttons/IconButtons";

const BaseModal: FC & {
  Overlay: FC<OverlayProps>;
  Container: FC<BaseProps>;
  Core: FC<BaseProps>;
  Header: FC<BaseProps>;
  HeaderTitle: FC<HeaderTitleProps>;
  CloseIcon: FC<CloseIconProps>;
  Body: FC<BaseProps>;
  Footer: FC<BaseProps>;
  FooterButtons: FC<BaseProps>;
} = () => {
  return null;
};

interface BaseProps {
  children: ReactNode;
}

interface OverlayProps extends BaseProps {
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ onClose, children }) => {
  return (
    <div className="ModalOverlay" onClick={onClose}>
      {children}
    </div>
  );
};

const Container: FC<BaseProps> = ({ children }) => {
    return <div className="ModalContainer">{children}</div>;
  };

const Core: FC<BaseProps> = ({ children }) => {
  return <div className="ModalCore">{children}</div>;
};

const Header: FC<BaseProps> = ({ children }) => {
  return <div className="ModalHeader" style={{marginTop: 15}}>{children}</div>;
};

interface HeaderTitleProps {
    title: string
}

const HeaderTitle: FC<HeaderTitleProps> = ({ title }) => {
    return (
        <div className='ModalTitle'>
            <TitleText text={title}/>
        </div>
    )
};

interface CloseIconProps {
    onClose: () => void;
}

const CloseIcon: FC<CloseIconProps> = ({ onClose }) => {
    return (
        <div className='ModalIconClose'>
            <IconButton Icon={IoClose} onPress={onClose}/>
        </div>
    )
};

const Body: FC<BaseProps> = ({ children }) => {
  return <div className="ModalBody">{children}</div>;
};

const Footer: FC<BaseProps> = ({ children }) => {
  return <div className="ModalFooter">{children}</div>;
};

const FooterButtons: FC<BaseProps> = ({ children }) => {
  return <div className="ModalButtons">{children}</div>;
};

BaseModal.Overlay = Overlay;
BaseModal.Container = Container;
BaseModal.Core = Core;
BaseModal.Header = Header;
BaseModal.HeaderTitle = HeaderTitle;
BaseModal.CloseIcon = CloseIcon;
BaseModal.Body = Body;
BaseModal.Footer = Footer;
BaseModal.FooterButtons = FooterButtons;

export default BaseModal;
