import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <div className="bg-[#ffffff7e] p-5 rounded-lg w-[400px] lg:w-[600px] border shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-primary">Log in</h1>
        {/* <p className="text-sm text-gray-700">
          Sign in to continue your beauty journey
        </p> */}
      </div>

      <div className="mt-10">
        <LoginForm />
      </div>
    </div>
  );
}
