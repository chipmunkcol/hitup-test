import Swal from 'sweetalert2';

export const 커스텀_alert = async (title: string, text: string) => {
  return await Swal.fire({
    title: `<div className={TYPOGRAPHY.Heading124Bold}>${title}</div>`,
    text: text,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
    네
  `,
    cancelButtonText: `
    아니오
  `,
    reverseButtons: true,
  });
};
