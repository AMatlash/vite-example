const drafts = JSON.parse(localStorage.getItem('drafts') || '{}');
const _saveDrafts = () => {
    localStorage.setItem('drafts', JSON.stringify(drafts));
    console.log('Drafts:', drafts);
};

let draftsDebounceTimeout: ReturnType<typeof setTimeout>;

const saveDrafts = () => {
    clearTimeout(draftsDebounceTimeout);
    draftsDebounceTimeout = setTimeout(() => _saveDrafts(), 100);
};

export const saveDraft = (id: string, payload: any) => {
    drafts[id] = payload;
    saveDrafts();
};

export const getDraft = async (id: string) => {
    return drafts[id] || {};
};

export const clearDraft = (id: string) => {
    delete drafts[id];
    saveDrafts();
};
