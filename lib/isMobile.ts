export const useIsMobile = () => {
	let isMobile = window.innerHeight>window.innerWidth&&window.innerWidth<500;

  return isMobile
};
