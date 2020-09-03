const createPageList = (listLength: number) => {
    const pageList = [];
    for (let i = 0; i < listLength; i++) {
        pageList.push(i + 1);
    }
    return pageList;
};

export default createPageList;
