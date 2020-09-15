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

export interface pageProps {
    page: number | null;
    origins: string[] | null;
    minPrice: number | null;
    maxPrice: number | null;
}

export interface productsOriginsProps {
    displayName: string;
    value: string;
}

export interface productsConfigProps {
    page: number;
    perPage: number;
    totalItems: number;
}

export interface productsPageProps {
    currentPage: number;
    pageCount: number;
}

export interface originsProps {
    name: string;
    value: string;
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface inputPriceProps {
    onBlurHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholderValue: string;
}

export interface MaxMinProps {
    onBlurMinPriceHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurMaxPriceHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
