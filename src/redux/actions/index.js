export const SEND_PROFILE_DATA = 'SEND_PROFILE_DATA';

const sendProfileData = (data) => ({
  type: SEND_PROFILE_DATA,
  payload: { ...data },
});

export default sendProfileData;
