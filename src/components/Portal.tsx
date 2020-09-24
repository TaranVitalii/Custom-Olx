import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { PortalProps } from 'interfaces';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const Portal = ({ children }: PortalProps) => {
    const container = document.createElement('div');

    useEffect(() => {
        modalRoot?.appendChild(container);

        return () => {
            modalRoot?.removeChild(container);
        };
    });

    return createPortal(children, container);
};

export default Portal;
