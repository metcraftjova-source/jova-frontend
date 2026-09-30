export const openEnquiry = (mode = 'enquiry', lenis) => {
  const targetId = mode === 'upload' ? 'drawing-dropzone' : 'enquiry-form';
  const target = document.getElementById(targetId);

  // Not on a page that has the form -> go to the Contact page, which handles the hash.
  if (!target) {
    window.location.assign(`/contact#${targetId}`);
    return;
  }

  const notify = () =>
    window.dispatchEvent(new CustomEvent('jova-enquiry', { detail: { mode } }));
  const offset = -Math.round(window.innerHeight * 0.25);

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6, onComplete: notify });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(notify, 900);
  }
};