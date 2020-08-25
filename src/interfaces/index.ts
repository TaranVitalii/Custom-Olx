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

export interface createOrderProps {
    order: orderPiecesProps;
}

export interface orderPiecesProps {
    pieces: createOrderListProps[] | null;
}

export interface createOrderListProps {
    productId: string;
    count: number;
}

export interface updatedProductProps {
    product: updatedOrderWithCountProps;
}

export interface updatedOrderWithCountProps {
    count: number;
    id: string;
    name: string;
    price: number;
    origin: string;
    createdAt: string;
    updatedAt: string;
    isEditable: boolean;
}

export interface orderListProps {
    items: orderProps[];
}

export interface orderProps {
    id: string;
    pieces: [
        {
            product: productSummaryProps;
            count: number;
        },
    ];
    createdAt: string;
}

export interface productsListProps {
    product: productSummaryProps;
}
