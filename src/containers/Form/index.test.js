import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      render(<Form onSuccess={onSuccess} onError={onError}/>);

      fireEvent.change(screen.getByTestId("nom"), {
        target: { value: "Jean-Michel" },
      });

      fireEvent.change(screen.getByTestId("prenom"), {
        target: { value: "Jean-Michel" },
      });
      
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "jeanmichel@example.com" },
      });

      fireEvent.change(screen.getByTestId("message"), {
        target: { value: "Ceci est un message." },
      });

      fireEvent.click(screen.getByTestId("collapse-button-testid"));

      // Sélection du type
      fireEvent.click(screen.getByText("Personnel"));
      fireEvent.click(screen.getByTestId("button-test-id"));
      
      // Attendre que "En cours" soit affiché
      await screen.findByText("En cours");

      // Vérifiez que la fonction onSuccess a été appelée
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
      
      // Vérifiez que le bouton texte est revenu à "Envoyer" après la modale de succès
      await waitFor(() => {
        expect(screen.getByText("Envoyer")).toBeInTheDocument();
      });
    });
  });

  describe("and a click is triggered on the submit button", () => {
    it("the error action is called", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      render(<Form onSuccess={onSuccess} onError={onError} />);
      
      fireEvent.click(screen.getByTestId("button-test-id"));
      
      // Vérifiez que la fonction onError a été appelée
      expect(onError).toHaveBeenCalled(); 
    });
  });
}); 