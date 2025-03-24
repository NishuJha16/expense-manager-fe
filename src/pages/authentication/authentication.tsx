const Authentication = ({ children }: any) => {
  return (
    <section className="h-screen p-8">
      <div className="h-full">
        <div className="flex flex-col lg:flex-row h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="flex-none lg:flex-1">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {children}
        </div>
      </div>
    </section>
  );
};
export default Authentication;
