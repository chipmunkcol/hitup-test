import { TYPOGRAPHY } from '@/styles/typography';
import Swal from 'sweetalert2';

export const swalConfirm = async (
  title: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  text?: string
) => {
  return await Swal.fire({
    title: `<div className=${TYPOGRAPHY.Heading124Bold}>${title}</div>`,
    // title: title,
    html: text,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: confirmButtonText || '확인',
    cancelButtonText: cancelButtonText || '취소',
    reverseButtons: true,
  });
};

export const swalAlert = async (
  title: string,
  text?: string,
  confirmButtonText?: string
) => {
  return await Swal.fire({
    title: title,
    text: text,
    confirmButtonText: confirmButtonText || '확인',
  });
};

const swal = Swal.mixin({
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
  swal.fire({
    icon: icon,
    title: title,
  });
};

export const swalLawAlert = async () => {
  return Swal.fire({
    // title: '',
    html: `
    <div style="padding: 20px">
      법률에 근거하지 않은 판매자의 임의적인 청약철회 기준 안내 시 <br/> 이용정지 및 관련 법에 의거하여 제재될 수 있습니다.<br/>
      청약철회(반품/교환/취소) 규정에 대한 <br/> 자세한 내용은 자주묻는질문을 통해 확인 가능합니다.
    </div>`,
    confirmButtonText: '확인',
  });
};
