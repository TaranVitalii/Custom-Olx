import React from 'react';

export interface childrenProps {
    children?: React.ReactNode;
}

export interface productSummaryProps {
    id: string;
    name: string;
    price: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    isEditable: boolean;
}

export interface productsListProps {
    product: productSummaryProps;
}
