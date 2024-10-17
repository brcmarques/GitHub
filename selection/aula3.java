import java.util.Random;

public class aula3 {
    public static void main(String[] args) {
        // Cria um objeto da classe Random
        Random random = new Random();

        // Gera um número aleatório entre 0 e 99
        int numeroAleatorio = random.nextInt(100);

        // Exibe o número aleatório
        System.out.println("Número aleatório gerado: " + numeroAleatorio);
    }
}
