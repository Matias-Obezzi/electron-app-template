import { createContext, useState } from "react";
import classnames from "classnames";

export type ModalOptions = {
  closeOnOverlayClick?: boolean;
  modalClass?: string;
}

export type ModalContextType = {
  isOpen: boolean;
  open: (content: React.ReactNode, options?: ModalOptions) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {}
});

const defaultOptions: ModalOptions = {
  closeOnOverlayClick: true,
  modalClass: undefined
}

export const ModalContextProvider = ({ children } : { children: React.ReactNode }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ options, setOptions ] = useState<ModalOptions>({});
  const [ content, setContent ] = useState<React.ReactNode>(null);

  const open = (content: React.ReactNode, options?: ModalOptions) => {
    setOptions(options || defaultOptions);
    setContent(content);
    setIsOpen(true);
  }

  const close = () => {
    setContent(null);
    setOptions({});
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
      {isOpen && <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          {...options.closeOnOverlayClick && { onClick: close }}
        >
          <div className={classnames("p-4 bg-white rounded shadow-lg max-w-[90%] max-h-[90%]", options.modalClass)} onClick={e => e.stopPropagation()}>
            {content}
          </div>
        </div>
      </>}
    </ModalContext.Provider>
  )
}