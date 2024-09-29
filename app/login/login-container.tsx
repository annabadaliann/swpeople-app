"use client";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Credentials } from "@/lib/store/services/auth/auth.type";
import { loginAction } from "@/lib/store/features/auth/auth.thunk";

function LoginContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.auth.isAuthLoading);

  const onFinish = (values: Credentials) => {
    dispatch(
      loginAction({
        credentials: values,
        cb: () => {
          router.push("/people");
        },
      })
    );
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Sign in
        </h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginContainer;
