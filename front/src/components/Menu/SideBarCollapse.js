import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function SideBarCollapse(props) {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const { title, icon, children } = props;
    const isCollapsable = true;

    // Verifica se algum filho está ativo para manter aberto
    useEffect(() => {
        let hasActiveChild = false;
        React.Children.forEach(children, child => {
            if (location.pathname === child.props.to) {
                hasActiveChild = true;
            }
        });
        if (hasActiveChild) {
            setIsCollapsed(false);
        }
    }, [location.pathname, children]);

    return (
        <li className="nav-item">
            <span
                className="nav-link d-flex justify-content-between align-items-center"
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-expanded={!isCollapsed}
                style={{ cursor: 'pointer' }}
            >
                <span>
                    <span className="sidebar-icon">
                        {icon}
                    </span>
                    <span className="sidebar-text">{title}</span>
                </span>
                {isCollapsable && (
                    <span className="link-arrow">
                        <svg className={`icon icon-sm ${isCollapsed ? '' : 'rotate-90'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ transform: isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }}>
                           <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                )}
            </span>
            <div className={`multi-level collapse ${!isCollapsed ? 'show' : ''}`} role="list" aria-expanded={!isCollapsed}>
                <ul className="flex-column nav">
                    {children}
                </ul>
            </div>
        </li>
    );
}

export default SideBarCollapse;
