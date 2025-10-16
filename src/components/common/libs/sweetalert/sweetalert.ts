import Swal from 'sweetalert2';

export const swalConfirm = async (
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

const sweatalert = Swal.mixin({
  toast: true,
  position: 'center',
  // iconColor: 'white',
  // customClass: {
  //   popup: 'colored-toast',
  // },
  // showConfirmButton: false,
  // timer: 1500,
  // timerProgressBar: true,
});

type IconProps = 'success' | 'error' | 'warning' | 'info' | 'question';
export const swalToast = (icon: IconProps, title: string) => {
  sweatalert.fire({
    icon: icon,
    title: title,
  });
};
