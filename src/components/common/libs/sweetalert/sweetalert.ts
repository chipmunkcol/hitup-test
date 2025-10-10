import Swal from 'sweetalert2';

export const 커스텀_alert = async (
  title: string,
  text: string,
  confirmButtonText?: string,
  cancelButtonText?: string
) => {
  return await Swal.fire({
    title: `<div className={TYPOGRAPHY.Heading124Bold}>${title}</div>`,
    html: text,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: confirmButtonText || '확인',
    cancelButtonText: cancelButtonText || '취소',
    reverseButtons: true,
  });
};
