import { Button } from "@mantine/core";

export interface PasteButtonProps {
  onPaste: (text: string) => void;
}

const PasteButton: React.FC<PasteButtonProps> = ({ onPaste }) => {
  const onClick = () => {
    const textarea = document.createElement("textarea");
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);

    textarea.value = "";
    textarea.select();
    document.execCommand("paste");
    const copied = textarea.value;
    textarea.remove();

    if (copied) {
      onPaste(copied);
    }
  };
  return <Button onClick={onClick}>Import from Clipboard</Button>;
};

export default PasteButton;
