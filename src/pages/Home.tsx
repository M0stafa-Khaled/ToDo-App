import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "../components/ui/Button";
import Cookies from "universal-cookie";
import { ITodo } from "../interfaces";
import toast from "react-hot-toast";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Skeleton from "../components/ui/Skeleton";
import useCustomQuery from "../hooks/useCustomQuery";
import Modal from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Textarea from "../components/ui/Textarea";
import axiosInstanceAPI from "../config/axios.config";

export const HomePage = () => {
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [todoToAdd, setTodoToAdd] = useState<ITodo>({
    title: "",
    description: "",
  });

  // GET JWT FROM COOKIES
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");

  // GET USER DATA FROM SERVER
  const [userData, setUserData] = useState({
    id: 0,
    username: "",
    email: "",
  });
  useEffect(() => {
    if (!jwt) return;
    (async () => {
      try {
        const { data } = await axiosInstanceAPI.get("/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUserData(data);
      } catch (error) {
        toast.error("An error has occurred while getting user data", {
          icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
          position: "bottom-center",
          duration: 3000,
          style: {
            background: "#fff",
            color: "#121212",
            padding: "10px",
          },
        });
      }
    })();
  }, [jwt]);

  // SEND REQUEST TO SERVER FOR GET DATA
  const [queryVersion, setQueryVersion] = useState(1);
  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  });

  // -------------- HANDLERS MODALS------------------ //
  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const onCloseEditModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsEditModalOpen(false);
  };

  const onOpenConfirmModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsConfirmModalOpen(true);
  };

  const onCloseConfirmModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsConfirmModalOpen(false);
  };

  const onOpenAddModal = () => {
    setIsAddModalOpen(true);
  };
  const onCloseAddModal = () => {
    setIsAddModalOpen(false);
    setTodoToAdd({
      title: "",
      description: "",
    });
  };

  // -------------- HANDLERS TODO ------------------ //
  const onChangeEditHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTodoToEdit({ ...todoToEdit, [name]: value });
  };

  const onChangeAddHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTodoToAdd({ ...todoToAdd, [name]: value });
  };

  const onRemoveTodo = async () => {
    try {
      const { status } = await axiosInstanceAPI.delete(
        `/todos/${todoToEdit.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      onCloseConfirmModal();
      if (status === 200) {
        setQueryVersion((prev) => prev + 1);
        toast.success("Todo Deleted Successfully", {
          position: "bottom-center",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#121212",
            padding: "10px",
          },
          iconTheme: {
            primary: "rgb(16 194 0)",
            secondary: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("An Error Occurred While Updating", {
        icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
        position: "top-center",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
      });
    }
  };

  const onSubmitAddHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { title, description } = todoToAdd;
      if (title === "") {
        toast.error("Please fill all fields", {
          icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
          position: "bottom-center",
          duration: 3000,
          style: {
            background: "#fff",
            color: "#121212",
            padding: "10px",
          },
        });
        return;
      }
      setIsUpdating(true);
      const userId = userData.id;
      const { status } = await axiosInstanceAPI.post(
        "/todos",
        {
          data: { title, description, user: [userId] },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (status === 200) {
        setQueryVersion((prev) => prev + 1);
        toast.success("Todo Added Successfully", {
          position: "bottom-center",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#121212",
            padding: "10px",
          },
          iconTheme: {
            primary: "rgb(16 194 0)",
            secondary: "#fff",
          },
        });
      }
      onCloseAddModal();
    } catch (error) {
      toast.error("An error occurred while add this todo", {
        icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
        position: "top-center",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitEditHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, id } = todoToEdit;
    if (title === "") {
      toast.error("Please fill all fields", {
        icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
        position: "bottom-center",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
      });
      return;
    }
    setIsUpdating(true);
    try {
      const { status } = await axiosInstanceAPI.put(
        `/todos/${id}`,
        {
          data: { title, description },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      onCloseEditModal();

      if (status === 200) {
        setQueryVersion((prev) => prev + 1);
        toast.success("Todo Updated Successfully", {
          position: "bottom-center",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#121212",
            padding: "10px",
          },
          iconTheme: {
            primary: "rgb(16 194 0)",
            secondary: "#fff",
          },
        });
      }
    } catch (error) {
      toast.error("An Error Occurred While Updating", {
        icon: <ExclamationTriangleIcon className="size-6 text-red-600" />,
        position: "top-center",
        duration: 3000,
        style: {
          background: "#fff",
          color: "#121212",
          padding: "10px",
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // LOADING
  if (isLoading)
    return (
      <div className="text-white pt-14 flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full animate-pulse">
          <div className="flex justify-center mb-10 w-full">
            <Skeleton className="h-12 w-48 "></Skeleton>
          </div>
        </div>

        <div className="max-w-3xl w-full animate-pulse flex justify-center">
          <div className="w-full flex flex-col justify-center items-center space-y-4">
            {Array.from({ length: 3 }, (_, idx) => (
              <Skeleton key={idx} className="h-14 w-full" />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="text-white pt-14">
      <div className="flex justify-center mb-10">
        <Button
          className="w-48 capitalize font-medium bg-transparent transition-all duration-300 border-2 border-blue-800 hover:bg-blue-800 shadow-blue-500/20 hover:shadow-blue-500/40 hover:shadow-md py-3 px-6 text-white rounded-xl text-base tracking-wider"
          onClick={() => {
            onOpenAddModal();
          }}
        >
          Add new todo
        </Button>
      </div>
      <div className="w-full flex flex-col justify-center items-center space-y-4">
        {/* TODO */}
        {data.length ? (
          data.map((todo: ITodo, idx: number) => (
            <div
              key={todo.id}
              className="max-w-3xl w-full flex flex-col md:flex-row items-center md:space-y-0 bg-[#383e423b] py-3 px-5 rounded-lg hover:bg-[#1b232bc5] shadow-lg hover:shadow-[#2c38459b] transition-all duration-300"
            >
              <div className="w-full text-2xl flex flex-col">
                <h4 className="pr-2">
                  {idx + 1} - {todo.title}
                </h4>
                <p className="text-gray-400 text-sm p4-5">{todo.description}</p>
              </div>
              <div className="flex gap-2 items-center w-full md:w-fit mt-3">
                <Button
                  className="w-full flex justify-center font-medium bg-blue-800 shadow-blue-500/20 hover:shadow-blue-500/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
                  onClick={() => {
                    onOpenEditModal(todo);
                  }}
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </Button>
                <Button
                  className="w-full flex justify-center font-medium bg-red-700 shadow-red-700/20 hover:shadow-red-700/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
                  onClick={() => {
                    onOpenConfirmModal(todo);
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center font-semibold text-red-400 text-5xl mt-8">
            No Todos Yet!
          </h2>
        )}
        {/* // TODO // */}
      </div>
      {/* EDIT TODO MODAL */}
      <Modal
        isOpen={isEditModalOpen}
        closeModal={onCloseEditModal}
        title="Edit This Todo"
      >
        <form onSubmit={onSubmitEditHandler}>
          <div className="mb-4 w-full">
            <div className="relative w-full min-w-[200px] h-11">
              <Input
                type="text"
                name="title"
                value={todoToEdit.title}
                onChange={onChangeEditHandler}
              />
              <Label className="text-blue-gray-900">Title</Label>
            </div>
          </div>
          <div className="mb-4 w-full">
            <div className="relative w-full">
              <Textarea
                value={todoToEdit.description}
                name="description"
                onChange={onChangeEditHandler}
              />
              <Label className="text-blue-gray-900">Description</Label>
            </div>
          </div>
          <div className="mt-6 flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <Button
              className="flex justify-center w-full font-medium bg-blue-800 shadow-blue-500/20 hover:shadow-blue-500/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
              type="submit"
              isLoading={isUpdating}
            >
              Update
            </Button>
            <Button
              className="font-medium w-full bg-gray-700 shadow-gray-700/20 hover:shadow-gray-700/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
              onClick={onCloseEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* // EDIT TODO MODAL // */}
      {/* --------------------- */}
      {/* REMOVE TODO MODAL */}
      <Modal
        isOpen={isConfirmModalOpen}
        closeModal={onCloseConfirmModal}
        title="Are you sure you want to remove this todo from your store?"
        description="Deleting this todo will remove it premanently from your invetory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the inended."
      >
        <div className="mt-6 flex flex-col flex-shrink-0 space-y-3 md:flex-row md:space-y-0 md:space-x-3">
          <Button
            className="flex justify-center w-full font-medium bg-red-900 shadow-red-500/20 hover:shadow-red-500/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
            onClick={onRemoveTodo}
          >
            Yes, remove
          </Button>
          <Button
            className="font-medium w-full bg-gray-700 shadow-gray-700/20 hover:shadow-gray-700/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
            onClick={onCloseConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      {/* // REMOVE TODO MODAL // */}
      {/* ----------------------- */}
      {/* ADD TODO MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        closeModal={onCloseConfirmModal}
        title="Add a new todo"
      >
        <form onSubmit={onSubmitAddHandler}>
          <div className="mb-4 w-full">
            <div className="relative w-full min-w-[200px] h-11">
              <Input
                type="text"
                name="title"
                value={todoToAdd.title}
                onChange={onChangeAddHandler}
              />
              <Label className="text-blue-gray-900">Title</Label>
            </div>
          </div>
          <div className="mb-4 w-full">
            <div className="relative w-full">
              <Textarea
                value={todoToAdd.description}
                name="description"
                onChange={onChangeAddHandler}
              />
              <Label className="text-blue-gray-900">Description</Label>
            </div>
          </div>

          <div className="mt-6 flex flex-col flex-shrink-0 space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <Button
              className="flex w-full justify-center font-medium bg-blue-900 shadow-blue-500/20 hover:shadow-blue-500/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
              type="submit"
              isLoading={isUpdating}
            >
              Add
            </Button>
            <Button
              className="font-medium w-full bg-gray-700 shadow-gray-700/20 hover:shadow-gray-700/40 py-3 px-3 text-white rounded-lg text-base tracking-wider"
              onClick={onCloseAddModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* // ADD TODO MODAL // */}
    </div>
  );
};
