import create from "zustand";

// set 함수를 통해서만 상태를 변경할 수 있다
export const modalStatus = create((set) => ({
  modalState: false,
  SetModalState: () => set((state) => ({ modalState: !state.modalState })),
}));

export const postIdStatus = create((set) => ({
  postIdState: "",
  SetPostIdState: (text) => set((state) => ({ postIdState: text })),
}));
