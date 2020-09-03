import React from 'react';
import styled from 'styled-components';

interface pageCountProps {
    isCurrentPage: boolean;
}

const PageCount = styled.div<pageCountProps>`
    padding: 5px 5px;
    margin: 2px;
    border-radius: 8px;
    cursor: default;
    color: ${({ theme, isCurrentPage }) => (isCurrentPage ? theme.textColors.white : `black`)};
    background-color: ${({ theme, isCurrentPage }) => (isCurrentPage ? `black` : theme.backgroundsColor.gray)};
`;

const Container = styled.div`
    padding-top: 20px;
    display: flex;
    justify-content: center;
`;

interface pageListProps {
    pageList: number[];
    currentPage: number;
    setPage: (page: number) => void;
}

const PagesListCounter = ({ pageList, currentPage, setPage }: pageListProps) => (
    <Container>
        {pageList.map((page: number) => (
            <PageCount key={page} isCurrentPage={currentPage === page} onClick={() => setPage(page)}>
                {page}
            </PageCount>
        ))}
    </Container>
);

export default PagesListCounter;
