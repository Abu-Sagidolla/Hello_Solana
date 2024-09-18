import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
const assert = require("assert");
const { SystemProgram } = anchor.web3;

describe("calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Calculator as Program<Calculator>;

  // Declare the _calculator variable globally
  let _calculator: anchor.web3.Keypair;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "Welcome to Solana");

    // Set _calculator to the generated calculator Keypair
    _calculator = calculator;
  });

  it("Adds two numbers", async function () {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: _calculator.publicKey, // Use _calculator here
      },
    });

    const account = await program.account.calculator.fetch(
      _calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Multiplies two numbers", async function () {
    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: _calculator.publicKey, // Use _calculator here
      },
    });

    const account = await program.account.calculator.fetch(
      _calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(6)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Subtracts two numbers", async function () {
    await program.rpc.subtract(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculator: _calculator.publicKey, // Use _calculator here
      },
    });

    const account = await program.account.calculator.fetch(
      _calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(7)));
    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Divides two numbers", async function () {
    await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
      accounts: {
        calculator: _calculator.publicKey, // Use _calculator here
      },
    });

    const account = await program.account.calculator.fetch(
      _calculator.publicKey
    );
    assert.ok(account.result.eq(new anchor.BN(3)));
    assert.ok(account.remainder.eq(new anchor.BN(1)));
    assert.ok(account.greeting === "Welcome to Solana");
  });
});
