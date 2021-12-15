function Loading({ className }) {
  return (
    <div className={className}>
      <div className="mx-auto">
        <svg
          version="1.2"
          className="mx-auto w-14 h-14 animate-spin"
          baseProfile="tiny"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 44 44"
        >
          <path
            fill="currentColor"
            d="M15.5,1.5c-9,2.8-15,11.1-15,20.5c0,11.9,9.6,21.5,21.5,21.5c9.8,0,18.4-6.7,20.8-16.1
	c0.2-0.8-0.3-1.6-1.1-1.8c-0.8-0.2-1.6,0.3-1.8,1.1l0,0c-2.1,8.1-9.4,13.8-17.9,13.8C11.8,40.5,3.5,32.2,3.5,22
	c0-8.1,5.3-15.2,12.9-17.6c0.8-0.2,1.2-1.1,1-1.9C17.2,1.7,16.3,1.2,15.5,1.5C15.5,1.5,15.5,1.5,15.5,1.5z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Loading;
